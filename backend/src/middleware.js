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
//   logError(error.message);
//   logError(request);
//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' });
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message });
//   }

  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
