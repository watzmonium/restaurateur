import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pgpool from "../db";
import config from "../config";
import middleware from "../middleware";

const usersRouter = express.Router();
const saltRounds = 10;

usersRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "email and password required to register" });

  const existingUser = await pgpool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (existingUser.rows.length > 0) {
    return res.status(400).json({ error: "User already exists with this email" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);

  const insertUserSql = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email;
    `;
  const result = await pgpool.query(insertUserSql, [email, hashedPassword]);

  const newUser = result.rows[0];
  res.status(201).json({
    message: "User registered successfully",
    user: { id: newUser.id, email: newUser.email },
  });
  res.status(201).send();
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "email and password required to log in" });

  const user = await pgpool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user.rows.length === 0) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.rows[0].id, email: user.rows[0].email },
    config.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
});

usersRouter.get("/:userId/restaurants", middleware.authenticateJWT, async (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);
  const sql = `SELECT 
                 u.id as user_id, 
                 res.*,
                 COALESCE(
                  JSONB_AGG(
                    jsonb_build_object(
                      'id', rev.id,
                      'dish_name', rev.dish_name,
                      'rating', rev.rating,
                      'review', rev.review,
                      'date', rev.date
                    )
                  ) FILTER (WHERE rev.id IS NOT NULL), 
                  '[]'::jsonb
                ) AS reviews
               FROM restaurants res
               LEFT JOIN reviews rev ON res.id = rev.restaurant_id
               JOIN users_restaurants ur ON ur.restaurant_id = res.id
               JOIN users u on u.id = ur.user_id
               WHERE u.id = $1
               GROUP BY u.id, res.id;`;
  const result = await pgpool.query(sql, [userId]);
  if (result.rows.length === 0)
    return res.status(404).json({ error: "user not found or has no reviews" });

  res.json(result.rows);
});

export default usersRouter;
