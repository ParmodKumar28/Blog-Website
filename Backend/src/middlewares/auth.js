// Middleware to check if token is valid or not here
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler.js';

const verifyToken = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies;

  // Check if token exists
  if (!token) {
    return next(new ErrorHandler(401, 'Authorization denied. No token provided'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(401, 'Invalid token'));
  }
};

export default verifyToken;
