import { Request, Response } from 'express';
import { StoryModel } from '../models/Story';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { StoryCreateData, StoryUpdateData, StoryFilters } from '@storytelling/types';

/**
 * Get all stories with filters and pagination
 */
export const getStories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    page = '1',
    limit = '10',
    author_id,
    search
  } = req.query;

  const filters: StoryFilters = {
    author_id: author_id ? parseInt(author_id as string) : undefined,
    search: search as string,
    limit: parseInt(limit as string),
    offset: (parseInt(page as string) - 1) * parseInt(limit as string)
  };

  const { stories, total } = await StoryModel.findAll(filters);

  const currentPage = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const totalPages = Math.ceil(total / limitNum);

  res.status(200).json({
    success: true,
    message: 'Stories retrieved successfully',
    data: {
      stories,
      pagination: {
        page: currentPage,
        limit: limitNum,
        total,
        totalPages,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
      }
    }
  });
});

/**
 * Get story by ID
 */
export const getStoryById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const storyId = parseInt(id);

  if (isNaN(storyId)) {
    throw createError('Invalid story ID', 400);
  }

  const story = await StoryModel.findByIdWithDetails(storyId);
  if (!story) {
    throw createError('Story not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Story retrieved successfully',
    data: story
  });
});

/**
 * Create new story
 */
export const createStory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  if (!userId) {
    throw createError('User not authenticated', 401);
  }

  const { title, content }: StoryCreateData = req.body;

  const story = await StoryModel.create({
    title,
    content,
    author_id: userId
  });

  // Get story with author details
  const storyWithDetails = await StoryModel.findByIdWithDetails(story.id);

  res.status(201).json({
    success: true,
    message: 'Story created successfully',
    data: storyWithDetails
  });
});

/**
 * Update story
 */
export const updateStory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const storyId = parseInt(id);

  if (isNaN(storyId)) {
    throw createError('Invalid story ID', 400);
  }

  const { title, content }: StoryUpdateData = req.body;

  const updatedStory = await StoryModel.update(storyId, {
    title,
    content
  });

  if (!updatedStory) {
    throw createError('Story not found', 404);
  }

  // Get story with author details
  const storyWithDetails = await StoryModel.findByIdWithDetails(updatedStory.id);

  res.status(200).json({
    success: true,
    message: 'Story updated successfully',
    data: storyWithDetails
  });
});

/**
 * Delete story
 */
export const deleteStory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const storyId = parseInt(id);

  if (isNaN(storyId)) {
    throw createError('Invalid story ID', 400);
  }

  const deleted = await StoryModel.delete(storyId);
  if (!deleted) {
    throw createError('Story not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Story deleted successfully'
  });
});

/**
 * Get stories by user (authored and collaborated)
 */
export const getUserStories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const targetUserId = parseInt(userId);

  if (isNaN(targetUserId)) {
    throw createError('Invalid user ID', 400);
  }

  const stories = await StoryModel.findByUser(targetUserId);

  res.status(200).json({
    success: true,
    message: 'User stories retrieved successfully',
    data: stories
  });
});

/**
 * Get current user's stories
 */
export const getMyStories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  if (!userId) {
    throw createError('User not authenticated', 401);
  }

  const stories = await StoryModel.findByUser(userId);

  res.status(200).json({
    success: true,
    message: 'Your stories retrieved successfully',
    data: stories
  });
});