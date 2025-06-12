import { Request, Response, NextFunction } from 'express';
import { StoryModel } from '../models/Story';
import { ContributorModel } from '../models/Contributor';

/**
 * Middleware to check if user is the author of a story
 */
export const authorizeStoryAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id: storyId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!storyId || isNaN(Number(storyId))) {
      res.status(400).json({
        success: false,
        message: 'Valid story ID required'
      });
      return;
    }

    const isAuthor = await StoryModel.isAuthor(Number(storyId), userId);

    if (!isAuthor) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to perform this action. Only the story author can perform this operation.'
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({
      success: false,
      message: 'Authorization check failed'
    });
  }
};

/**
 * Middleware to check if user can edit a story (author or contributor)
 */
export const authorizeStoryEdit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id: storyId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!storyId || isNaN(Number(storyId))) {
      res.status(400).json({
        success: false,
        message: 'Valid story ID required'
      });
      return;
    }

    const canEdit = await StoryModel.canEdit(Number(storyId), userId);

    if (!canEdit) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this story. Only the author and contributors can edit stories.'
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({
      success: false,
      message: 'Authorization check failed'
    });
  }
};

/**
 * Middleware to check if user can add contributors to a story (only author)
 */
export const authorizeAddContributor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { story_id: storyId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!storyId || isNaN(Number(storyId))) {
      res.status(400).json({
        success: false,
        message: 'Valid story ID required in request body'
      });
      return;
    }

    const isAuthor = await StoryModel.isAuthor(Number(storyId), userId);

    if (!isAuthor) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to add contributors to this story. Only the story author can add contributors.'
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({
      success: false,
      message: 'Authorization check failed'
    });
  }
};

/**
 * Middleware to check if user can remove a contributor (only author)
 */
export const authorizeRemoveContributor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id: contributorId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!contributorId || isNaN(Number(contributorId))) {
      res.status(400).json({
        success: false,
        message: 'Valid contributor ID required'
      });
      return;
    }

    // Get the contributor to find the story
    const contributor = await ContributorModel.findById(Number(contributorId));
    if (!contributor) {
      res.status(404).json({
        success: false,
        message: 'Contributor not found'
      });
      return;
    }

    // Check if the user is the author of the story
    const isAuthor = await StoryModel.isAuthor(contributor.story_id, userId);

    if (!isAuthor) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to remove contributors from this story. Only the story author can remove contributors.'
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({
      success: false,
      message: 'Authorization check failed'
    });
  }
};

/**
 * Middleware to check if user can view a story's contributors
 */
export const authorizeViewContributors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { story_id: storyId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!storyId || isNaN(Number(storyId))) {
      res.status(400).json({
        success: false,
        message: 'Valid story ID required'
      });
      return;
    }

    // Check if user can edit the story (author or contributor)
    const canEdit = await StoryModel.canEdit(Number(storyId), userId);

    if (!canEdit) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to view contributors for this story.'
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({
      success: false,
      message: 'Authorization check failed'
    });
  }
};