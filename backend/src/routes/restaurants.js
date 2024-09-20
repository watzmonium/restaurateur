import express from "express";

import pgpool from "../db";
import config from "../config";
import middleware from "../middleware";

const restaurantRouter = express.Router();

restaurantRouter.get("/", middleware.authenticateJWT, async (req, res) => {
  // could extend to avg rating here later
  const sql = `SELECT DISTINCT ON (google_id)
                 id, google_id, name
               FROM restaurants;`;
  const result = await pgpool.query(sql);

  if (result.rows.length === 0)
    return res.status(404).json({ error: "no restaurants found!" });
  res.status(200).json(result.rows);
});

restaurantRouter.post("/", middleware.authenticateJWT, async (req, res) => {
  const client = await pgpool.connect();

  // use an ACID transaction for multiple inserts
  try {
    await client.query("BEGIN");

    const { googleId, name, rating } = req.body;
    const userId = req.user.userId;

    if (!googleId || !name)
      return res
        .status(400)
        .json({ error: "A valid restaurant id, name, and rating must be included" });

    const restaurantRating = rating || null;

    const insertRestaurantSql = `
      INSERT INTO restaurants (google_id, name, rating)
      VALUES ($1, $2, $3)
      RETURNING id;`;
    const restaurantResult = await client.query(insertRestaurantSql, [
      googleId,
      name,
      restaurantRating,
    ]);
    const restaurantId = restaurantResult.rows[0].id;

    if (!restaurantId) {
      throw new Error("Error inserting into the restaurants table");
    }

    const insertUsersRestaurantsSql = `
      INSERT INTO users_restaurants (user_id, restaurant_id)
      VALUES ($1, $2);`;
    await client.query(insertUsersRestaurantsSql, [userId, restaurantId]);

    await client.query("COMMIT");

    res.status(201).json({ id: restaurantId });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error during transaction:", error);
    res.status(500).json({ error: "Error inserting restaurant and user relationship" });
  } finally {
    client.release();
  }
});

restaurantRouter.get("/search", middleware.authenticateJWT, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const googlePlacesApiKey = config.GOOGLE_CLOUD_API_KEY; // Store your API key in .env

  try {
    const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${googlePlacesApiKey}`;

    const response = await fetch(googlePlacesUrl);

    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(500).json({
        error: "Failed to fetch data from Google Places API",
        details: data.status,
      });
    }

    const restaurants = data.results.map((place) => ({
      name: place.name,
      address: place.formatted_address,
      avgRating: parseInt(place.rating),
      userRatingsTotal: place.user_ratings_total,
      placeId: place.place_id,
    }));

    res.status(200).json({ restaurants });
  } catch (error) {
    console.error("Error querying Google Places API:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

restaurantRouter.get("/:restaurantId", middleware.authenticateJWT, async (req, res) => {
  let { restaurantId } = req.params;
  restaurantId = parseInt(restaurantId);

  const hasOwnership = await hasOwnershipOfRestaurant(req.user.userId, restaurantId);
  if (!hasOwnership) {
    return res
      .status(403)
      .json({ error: "user is not authorized to acces this resource" });
  }
  const sql = `SELECT 
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
               WHERE res.id = $1
               GROUP BY res.id;`;
  const result = await pgpool.query(sql, [restaurantId]);
  const restaurant = result.rows[0];
  if (!restaurant) return res.status(404).json({ error: "cannot find restaurant" });

  res.status(200).json(restaurant);
});

restaurantRouter.patch("/:restaurantId", middleware.authenticateJWT, async (req, res) => {
  let { restaurantId } = req.params;
  restaurantId = parseInt(restaurantId);

  const hasOwnership = await hasOwnershipOfRestaurant(req.user.userId, restaurantId);
  if (!hasOwnership) {
    return res
      .status(403)
      .json({ error: "user is not authorized to acces this resource" });
  }

  const { name, rating } = req.body;

  if (!name || !rating)
    return res.status(400).json({ error: "bad request. please include name and rating" });

  const sql = `UPDATE restaurants
           SET name = $1, rating = $2
           WHERE id = $3
           RETURNING *;`;
  const result = await pgpool.query(sql, [name, rating, restaurantId]);
  const restaurant = result.rows[0];
  if (!restaurant) return res.status(404).json({ error: "cannot find restaurant" });

  res.status(200).json(restaurant);
});

restaurantRouter.delete(
  "/:restaurantId",
  middleware.authenticateJWT,
  async (req, res) => {
    let { restaurantId } = req.params;
    restaurantId = parseInt(restaurantId);

    const hasOwnership = await hasOwnershipOfRestaurant(req.user.userId, restaurantId);
    if (!hasOwnership) {
      return res
        .status(403)
        .json({ error: "user is not authorized to acces this resource" });
    }

    const deleteResult = await pgpool.query(
      `DELETE FROM restaurants WHERE id = $1 RETURNING *`,
      [restaurantId]
    );

    if (deleteResult.rowCount === 0)
      return res.status(404).json({ error: "Restaurant not found" });

    res.status(200).json({ message: "Restaurant deleted successfully" });
  }
);

const hasOwnershipOfRestaurant = async (userId, restaurantId) => {
  const ownershipSql = `SELECT * FROM users_restaurants 
                          WHERE user_id = $1 
                          AND restaurant_id = $2`;

  const result = await pgpool.query(ownershipSql, [userId, restaurantId]);

  return result.rows && result.rows.length > 0;
};

export default restaurantRouter;
