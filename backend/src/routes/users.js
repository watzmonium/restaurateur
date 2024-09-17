import express from "express";

const usersRouter = express.Router();

const mockUsers = [
  {
    id: 1,
    name: "Foodie123",
  },
  {
    id: 2,
    name: "Gorlox The Destroyer",
  },
  {
    id: 3,
    name: "John Smith",
  },
  {
    id: 4,
    name: "Big Red",
  },
];

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

const mockReviews = [
    {
        id: 1,
        restaurantId: 1,
        dishName: 'tuna',
        userId: 1,
        rating: 3,
        review: 'it was fine.'
    },
      {
        id: 2,
        restaurantId: 3,
        dishName: 'clams casino',
        userId: 2,
        rating: 5,
        review: 'best clams casino this side of the mississippi'
    },
      {
        id: 3,
        restaurantId: 2,
        dishName: 'beans',
        userId: 3,
        rating: 1,
        review: 'beans yum yum.'
    },
]

usersRouter.post('/register', (req, res) => {
    const {email, password} = req.body

    if (!email || !password) return res.status(400).json({error: 'email and password required to register'})
    // add user to db

    res.status(201).send()
})

usersRouter.post('/login', (req, res) => {
    const {email, password} = req.body
        if (!email || !password) return res.status(400).json({error: 'email and password required to log in'})

    // check against db

    // return jwt or something
    res.status(200).send()
})

usersRouter.get("/:userId/restaurants", (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);
  const currentUser = mockUsers.find((user) => user.id === parseInt(userId));

  if (!currentUser) return res.status(404).json({ error: "user not found" });

  const usersRestaurants = mockRestaurants.filter((restauraunt) =>
    restauraunt.usersRestaurants.includes(userId)
  );

  if (usersRestaurants.length === 0) return res.status(404).json({ error: "user has no restaurants" });

  // will do this with sql - annoying in js
  const restaurantsWithReviews = usersRestaurants
  res.json(restaurantsWithReviews);
});

usersRouter.get("/:userId/reviews", (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);
  const currentUser = mockUsers.find((user) => user.id === parseInt(userId));

  if (!currentUser) return res.status(404).json({ error: "user not found" });

  const userReviews = mockReviews.filter((review) =>
    review.userId === userId
  );

  if (userReviews.length === 0) return res.status(404).json({ error: "user has no reviews" });

  res.json(userReviews);
});

export default usersRouter;
