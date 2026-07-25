// Router for the user is here
import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controller/user.controller.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.post('/logout', logoutUser);

// Exporting router
export default router;
