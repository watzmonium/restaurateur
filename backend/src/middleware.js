import jwt from 'jsonwebtoken'
import config from './config';

const logInfo = (...params) => {
  console.log(...params);
};

const logError = (...params) => {
  console.error(...params);
};

const requestLogger = (request, response, next) => {
  logInfo('Method:', request.method);
  logInfo('Path:  ', request.path);
  logInfo('Body:  ', request.body);
  logInfo('---');
  next();
};

const unknownEndpoint = (request, response) => {
  logError('unknown endpoint request', request);
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logError(error.message);
  logError(request);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const authenticateJWT = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authenticateJWT,
};
