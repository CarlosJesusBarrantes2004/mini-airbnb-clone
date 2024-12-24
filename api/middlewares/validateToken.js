import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const validateToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    const error = new Error('Not token provided');
    error.status = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateToken;
