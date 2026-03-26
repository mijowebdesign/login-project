import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';
import passport from '../config/passport.js';
import { generateRefreshToken } from '../services/authService.js';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

// Google Auth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  session: false // No need for sessions with JWT
}));

router.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login`,
  session: false 
}), async (req, res) => {
  const user = req.user;
  const refreshToken = generateRefreshToken(user);

  // Save refresh token to DB
  user.refreshToken = refreshToken;
  await user.save();

  // Send refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 
  });

  // Redirect to frontend
  res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/`);
});

export default router;
