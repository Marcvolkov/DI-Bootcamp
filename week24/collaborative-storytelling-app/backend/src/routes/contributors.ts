import { Router } from 'express';
import {
  addContributor,
  getStoryContributors,
  removeContributor,
  getUserCollaborations,
  removeContributorFromStory
} from '../controllers/contributorController';
import {
  validateAddContributor,
  validateIdParam,
  validateStoryIdParam
} from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import {
  authorizeAddContributor,
  authorizeRemoveContributor,
  authorizeViewContributors
} from '../middleware/authorize';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Contributor management routes
router.post('/', validateAddContributor, authorizeAddContributor, addContributor);
router.get('/my-collaborations', getUserCollaborations);
router.get('/:story_id', validateStoryIdParam, authorizeViewContributors, getStoryContributors);
router.delete('/:id', validateIdParam, authorizeRemoveContributor, removeContributor);
router.delete('/story/:story_id/user/:user_id', removeContributorFromStory);

export default router;