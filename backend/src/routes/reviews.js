import express from 'express';

const reviewsRouter = express.Router();

const mockReviews = [
    {
        id: 1,
        restaurantId: 1,
        rating: 3,
        review: 'it was fine.'
    },
      {
        id: 2,
        restaurantId: 3,
        rating: 5,
        review: 'best clams casino this side of the mississippi'
    },
      {
        id: 3,
        restaurantId: 2,
        rating: 1,
        review: 'food was amazing but my waiter looked at me.'
    },
]

reviewsRouter.get('/', (req, res) => {
   res.json(mockReviews)
})

export default reviewsRouter;