import express from "express";

const restaurantRouter = express.Router();

const mockRestaurants = [
  {
    id: 1,
    googleId: 1,
    usersRestaurants: [1, 3],
    name: "italian",
    rating: 5,
  },
  {
    id: 2,
    googleId: 2,
    usersRestaurants: [1],
    name: "chinese",
    rating: 3,
  },
  {
    id: 3,
    googleId: 3,
    usersRestaurants: [2, 3],
    name: "american",
    rating: 1,
  },
];

restaurantRouter.get("/", (req, res) => {
  res.json(mockRestaurants);
});

restaurantRouter.post('/', (req,res) => {
    let {googleId} = req.body
    if (!googleId) return res.status(400).json({error: 'a valid restaurant id must be included'})

    googleId = parseInt(googleId)

    // sql
    id = 1
    res.status(201).json({id: id})
})

restaurantRouter.get("/:restaurantId", (req, res) => {
    let {restaurantId} = req.params
    restaurantId = parseInt(restaurantId)
    const restaurant = mockRestaurants.find(restaurant => restaurant.id === restaurantId)

    if (!restaurant) return res.status(404).json({error: "cannot find restaurant"})

  res.json(restaurant);
});

restaurantRouter.patch("/:restaurantId", (req, res) => {
    let {restaurantId} = req.params
    restaurantId = parseInt(restaurantId)
    const restaurant = mockRestaurants.find(restaurant => restaurant.id === restaurantId)

    if (!restaurant) return res.status(404).json({error: "cannot find restaurant"})

  res.json(restaurant);
});

restaurantRouter.delete("/:restaurantId", (req, res) => {
    let {restaurantId} = req.params
    restaurantId = parseInt(restaurantId)
    const restaurant = mockRestaurants.find(restaurant => restaurant.id === restaurantId)

    if (!restaurant) return res.status(404).json({error: "cannot find restaurant"})

  res.json(restaurant);
});

export default restaurantRouter;
