import { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
  updateProfile,
  searchUsers,
  verifyToken
} from '../controllers/authController';
import {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateUserSearch
} from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { authRateLimit } from '../middleware/security';

const router = Router();

// Public routes with rate limiting
router.post('/register', authRateLimit, validateUserRegistration, register);
router.post('/login', authRateLimit, validateUserLogin, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// Protected routes
router.get('/verify', authenticateToken, verifyToken);
router.get('/profile', authenticateToken, getProfile);
router.patch('/profile', authenticateToken, validateUserUpdate, updateProfile);
router.get('/users/search', authenticateToken, validateUserSearch, searchUsers);

export default router;