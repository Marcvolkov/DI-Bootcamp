import { Router } from 'express';
import {
  getStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
  getUserStories,
  getMyStories
} from '../controllers/storyController';
import {
  validateStoryCreation,
  validateStoryUpdate,
  validateIdParam,
  validateStoryQuery
} from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { 
  authorizeStoryAuthor, 
  authorizeStoryEdit 
} from '../middleware/authorize';
import { storyCreationRateLimit } from '../middleware/security';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Story CRUD routes
router.get('/', validateStoryQuery, getStories);
router.post('/', storyCreationRateLimit, validateStoryCreation, createStory);
router.get('/my', getMyStories);
router.get('/user/:userId', validateIdParam, getUserStories);
router.get('/:id', validateIdParam, getStoryById);
router.patch('/:id', validateIdParam, validateStoryUpdate, authorizeStoryEdit, updateStory);
router.delete('/:id', validateIdParam, authorizeStoryAuthor, deleteStory);

export default router;