import express from 'express';

const reviewsRouter = express.Router();

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

reviewsRouter.get('/', (req, res) => {
   res.json(mockReviews)
})

reviewsRouter.get('/:reviewId', (req, res) => {
    let {reviewId} = req.body
    reviewId = parseInt(reviewId)

    const review = mockReviews.find(review => review.id === reviewId)

    if (!review) return res.status(404).json({error: "review not found"})

   res.json(review)
})

reviewsRouter.post('/', (req, res) => {
    const {restaurantId, dishName, rating, review} = req.body

    if (!restaurantId || !dishName || !rating || !review) return res.status(400).json({error: "please include restaurant id, dish name, rating, and review text"})

    // sql
    const id = 1
   res.status(201).json({id: id})
})

reviewsRouter.patch('/:reviewId', (req, res) => {
    let {reviewId} = req.body
    reviewId = parseInt(reviewId)

    const {param, value} = req.body
    const validFields = ['restaurantId', 'dishName', 'rating', 'review']

    if (!validFields.includes(param)) return res.status(400).json({error: "please include a valid field name. valid fields are: restaurantId, dishName, rating, and review"})

    // sql
   res.status(200).send()
})

reviewsRouter.delete('/:reviewId', (req, res) => {
    let {reviewId} = req.body
    reviewId = parseInt(reviewId)

    // sql
   res.status(200).send()
})

export default reviewsRouter;