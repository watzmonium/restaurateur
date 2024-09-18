import express from "express";

const usersRouter = express.Router();

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
