import express from 'express';

const restaurantRouter = express.Router();

const mockRestaurants = [
    {
        id: 1,
        name: 'italian',
    },
     {
        id: 2,
        name: 'chinese',
    },
     {
        id: 3,
        name: 'american',
    },
]

restaurantRouter.get('/', (req, res) => {
   res.json(mockRestaurants)
})

export default restaurantRouter;