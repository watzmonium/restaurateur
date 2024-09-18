import express from 'express';
import cors from 'cors';
import middleware from './middleware';

import restaurantRouter from './routes/restaurants';
import reviewsRouter from './routes/reviews';
import usersRouter from './routes/users';

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/restaurants', restaurantRouter)
app.use('/reviews', reviewsRouter)
app.use('/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app;
