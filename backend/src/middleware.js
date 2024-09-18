import jwt from "jsonwebtoken";
import config from "./config";

const logInfo = (...params) => {
  console.log(...params);
};

const logError = (...params) => {
  console.error(...params);
};

const requestLogger = (req, res, next) => {
  logInfo("Method:", req.method);
  logInfo("Path:  ", req.path);
  logInfo("Body:  ", req.body);
  logInfo("---");
  next();
};

const unknownEndpoint = (req, res) => {
  logError("unknown endpoint request", req);
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logError(error.message);
  logError(req);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
  next(error);
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Access token is missing or invalid" });

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access token is missing or invalid" });

  jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authenticateJWT,
};
