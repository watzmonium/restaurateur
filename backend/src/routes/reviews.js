import express from "express";
import pgpool from "../db";

import middleware from "../middleware";
const reviewsRouter = express.Router();

reviewsRouter.get("/:reviewId", middleware.authenticateJWT, async (req, res) => {
  let { reviewId } = req.params;
  reviewId = parseInt(reviewId);

  const hasOwnership = await hasOwnershipOfReview(req.user.userId, reviewId);
  if (!hasOwnership) {
    return res
      .status(403)
      .json({ error: "user is not authorized to acces this resource" });
  }

  const sql = `SELECT * FROM reviews
               WHERE id = $1;`;
  const result = await pgpool.query(sql, [reviewId]);
  const review = result.rows[0];
  if (!review) return res.status(404).json({ error: "review not found" });

  res.json(review);
});

reviewsRouter.post("/", middleware.authenticateJWT, async (req, res) => {
  const { restaurantId, dishName, rating, review } = req.body;

  if (!restaurantId || !dishName || !rating || !review)
    return res.status(400).json({
      error: "please include restaurant id, dish name, rating, and review text",
    });

  const hasOwnership = await hasOwnershipOfRestaurant(req.user.userId, restaurantId);
  if (!hasOwnership) {
    return res
      .status(403)
      .json({ error: "user is not authorized to acces this resource" });
  }

  const sql = `INSERT INTO reviews (restaurant_id, dish_name, rating, review)
               VALUES ($1, $2, $3, $4)
               RETURNING *;`;

  const result = await pgpool.query(sql, [restaurantId, dishName, rating, review]);

  const newReview = result.rows[0];

  if (!newReview) {
    throw new Error("Error creating review");
  }
  res.status(201).json({ review: newReview });
});

reviewsRouter.patch("/:reviewId", middleware.authenticateJWT, async (req, res) => {
  let { reviewId } = req.params;
  reviewId = parseInt(reviewId);

  const { dishName, rating, review } = req.body;

  if (!dishName || !rating || !review)
    return res.status(400).json({
      error: "please include restaurant id, dish name, rating, and review text",
    });

  const hasOwnership = await hasOwnershipOfReview(req.user.userId, reviewId);
  if (!hasOwnership) {
    return res
      .status(403)
      .json({ error: "user is not authorized to acces this resource" });
  }

  const sql = `UPDATE reviews
               SET dish_name = $1, rating = $2, review = $3
               WHERE id = $4
               RETURNING *;`;
  const result = await pgpool.query(sql, [dishName, rating, review, reviewId]);

  const updatedReview = result.rows[0];
  res.status(200).json({ review: updatedReview });
});

reviewsRouter.delete("/:reviewId", middleware.authenticateJWT, async (req, res) => {
  let { reviewId } = req.params;
  reviewId = parseInt(reviewId);

  const hasOwnership = await hasOwnershipOfReview(req.user.userId, reviewId);
  if (!hasOwnership) {
    return res
      .status(403)
      .json({ error: "user is not authorized to acces this resource" });
  }

  const sql = `DELETE FROM reviews WHERE id = $1 RETURNING *;`;

  const deleteResult = await pgpool.query(sql, [reviewId]);
  if (deleteResult.rowCount === 0)
    return res.status(404).json({ error: "Review not found" });

  res.status(200).json({ message: "Review deleted successfully" });
});

const hasOwnershipOfRestaurant = async (userId, restaurantId) => {
  const ownershipSql = `SELECT * FROM users_restaurants 
                          WHERE user_id = $1 
                          AND restaurant_id = $2`;

  const result = await pgpool.query(ownershipSql, [userId, restaurantId]);

  return result.rows && rresult.rows.length > 0;
};

const hasOwnershipOfReview = async (userId, reviewId) => {
  const ownershipSql = `SELECT ur.user_id, rev.id AS review_id, rev.restaurant_id
                        FROM users_restaurants ur
                        JOIN reviews rev ON ur.restaurant_id = rev.restaurant_id
                        WHERE ur.user_id = $1
                        AND rev.id = $2;`;

  const result = await pgpool.query(ownershipSql, [userId, reviewId]);

  return result.rows && result.rows.length > 0;
};
export default reviewsRouter;
