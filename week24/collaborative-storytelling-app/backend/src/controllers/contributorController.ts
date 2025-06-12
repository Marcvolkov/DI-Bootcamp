import { Request, Response } from 'express';
import { ContributorModel } from '../models/Contributor';
import { UserModel } from '../models/User';
import { StoryModel } from '../models/Story';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { AddContributorData } from '@storytelling/types';

/**
 * Add contributor to story
 */
export const addContributor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { story_id, user_id }: AddContributorData = req.body;

  // Verify story exists
  const story = await StoryModel.findById(story_id);
  if (!story) {
    throw createError('Story not found', 404);
  }

  // Verify user exists
  const user = await UserModel.findById(user_id);
  if (!user) {
    throw createError('User not found', 404);
  }

  // Check if user is already the author
  if (story.author_id === user_id) {
    throw createError('User is already the author of this story', 400);
  }

  // Check if user is already a contributor
  const isAlreadyContributor = await ContributorModel.isContributor(story_id, user_id);
  if (isAlreadyContributor) {
    throw createError('User is already a contributor to this story', 400);
  }

  const contributor = await ContributorModel.add({ story_id, user_id });

  // Get contributor with user details
  const contributorWithUser = await ContributorModel.findByIdWithUser(contributor.id);

  res.status(201).json({
    success: true,
    message: 'Contributor added successfully',
    data: contributorWithUser
  });
});

/**
 * Get contributors for a story
 */
export const getStoryContributors = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { story_id } = req.params;
  const storyId = parseInt(story_id);

  if (isNaN(storyId)) {
    throw createError('Invalid story ID', 400);
  }

  // Verify story exists
  const story = await StoryModel.findById(storyId);
  if (!story) {
    throw createError('Story not found', 404);
  }

  const contributors = await ContributorModel.findByStoryId(storyId);

  res.status(200).json({
    success: true,
    message: 'Contributors retrieved successfully',
    data: {
      story_id: storyId,
      contributors,
      count: contributors.length
    }
  });
});

/**
 * Remove contributor from story
 */
export const removeContributor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const contributorId = parseInt(id);

  if (isNaN(contributorId)) {
    throw createError('Invalid contributor ID', 400);
  }

  // Get contributor to verify it exists
  const contributor = await ContributorModel.findById(contributorId);
  if (!contributor) {
    throw createError('Contributor not found', 404);
  }

  const removed = await ContributorModel.remove(contributorId);
  if (!removed) {
    throw createError('Failed to remove contributor', 500);
  }

  res.status(200).json({
    success: true,
    message: 'Contributor removed successfully'
  });
});

/**
 * Get user's collaborations (stories they contribute to)
 */
export const getUserCollaborations = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  if (!userId) {
    throw createError('User not authenticated', 401);
  }

  const collaborations = await ContributorModel.findByUserId(userId);

  // Get story details for each collaboration
  const collaborationsWithStories = await Promise.all(
    collaborations.map(async (collaboration) => {
      const story = await StoryModel.findByIdWithDetails(collaboration.story_id);
      return {
        ...collaboration,
        story
      };
    })
  );

  res.status(200).json({
    success: true,
    message: 'User collaborations retrieved successfully',
    data: {
      collaborations: collaborationsWithStories,
      count: collaborationsWithStories.length
    }
  });
});

/**
 * Remove user from story (by story and user ID)
 */
export const removeContributorFromStory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { story_id, user_id } = req.params;
  const storyId = parseInt(story_id);
  const userId = parseInt(user_id);

  if (isNaN(storyId) || isNaN(userId)) {
    throw createError('Invalid story ID or user ID', 400);
  }

  // Verify story exists
  const story = await StoryModel.findById(storyId);
  if (!story) {
    throw createError('Story not found', 404);
  }

  // Verify user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createError('User not found', 404);
  }

  // Check if user is actually a contributor
  const isContributor = await ContributorModel.isContributor(storyId, userId);
  if (!isContributor) {
    throw createError('User is not a contributor to this story', 400);
  }

  const removed = await ContributorModel.removeByStoryAndUser(storyId, userId);
  if (!removed) {
    throw createError('Failed to remove contributor', 500);
  }

  res.status(200).json({
    success: true,
    message: 'Contributor removed from story successfully'
  });
});