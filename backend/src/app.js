import express from 'express';
import cors from 'cors';
import fs from 'fs'
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import { parse } from 'yaml'

import middleware from './middleware';
import restaurantRouter from './routes/restaurants';
import reviewsRouter from './routes/reviews';
import usersRouter from './routes/users';

const swaggerFilePath = path.join(__dirname, '../apiDocs.yaml')

const swaggerDoc = parse(fs.readFileSync(swaggerFilePath, 'utf8'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/restaurants', restaurantRouter)
app.use('/reviews', reviewsRouter)
app.use('/users', usersRouter)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.get('/', (req, res) => {
  res.redirect('/docs');
});

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app;
