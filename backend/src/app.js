import express from 'express';
import middleware from './middleware';

import restaurantRouter from './routes/restaurants';
import reviewsRouter from './routes/reviews';

const app = express();

app.use(express.json());
app.use(middleware.requestLogger)

app.use('/restaurants', restaurantRouter)
app.use('/reviews', reviewsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


export default app;
