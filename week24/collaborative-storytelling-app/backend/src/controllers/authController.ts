import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User';
import { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken 
} from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { LoginResponse, AuthUser } from '@storytelling/types';

/**
 * Register a new user
 */
export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw createError('An account with this email already exists', 409);
  }

  // Check if username is taken
  const existingUsername = await UserModel.findByUsername(username);
  if (existingUsername) {
    throw createError('This username is already taken', 409);
  }

  // Hash password
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
  const password_hash = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = await UserModel.create({
    username,
    email,
    password,
    password_hash
  });

  // Generate tokens
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Set refresh token as HTTP-only cookie
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  const response: LoginResponse = {
    user: authUser,
    accessToken
  };

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: response
  });
});

/**
 * Login user
 */
export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Find user with password hash
  const user = await UserModel.findByEmailWithPassword(email);
  if (!user) {
    throw createError('Invalid email or password', 401);
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    throw createError('Invalid email or password', 401);
  }

  // Generate tokens
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Set refresh token as HTTP-only cookie
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  const response: LoginResponse = {
    user: authUser,
    accessToken
  };

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: response
  });
});

/**
 * Refresh access token
 */
export const refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw createError('Refresh token not provided', 401);
  }

  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Check if user still exists
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      throw createError('User not found', 401);
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(decoded.userId);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken
      }
    });
  } catch (error) {
    // Clear invalid refresh token
    res.clearCookie('refreshToken');
    throw createError('Invalid refresh token', 401);
  }
});

/**
 * Logout user
 */
export const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Clear refresh token cookie
  res.clearCookie('refreshToken');

  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

/**
 * Get current user profile
 */
export const getProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    throw createError('User not authenticated', 401);
  }

  const userProfile = await UserModel.getProfile(userId);
  if (!userProfile) {
    throw createError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Profile retrieved successfully',
    data: userProfile
  });
});

/**
 * Update user profile
 */
export const updateProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const { username, email } = req.body;

  if (!userId) {
    throw createError('User not authenticated', 401);
  }

  // Check if new email is already taken by another user
  if (email) {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser && existingUser.id !== userId) {
      throw createError('This email is already taken by another user', 409);
    }
  }

  // Check if new username is already taken by another user
  if (username) {
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser && existingUser.id !== userId) {
      throw createError('This username is already taken by another user', 409);
    }
  }

  const updatedUser = await UserModel.update(userId, { username, email });
  if (!updatedUser) {
    throw createError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser
  });
});

/**
 * Search users (for adding contributors)
 */
export const searchUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { q: searchQuery, limit = '10' } = req.query;

  if (!searchQuery || typeof searchQuery !== 'string') {
    throw createError('Search query is required', 400);
  }

  const users = await UserModel.search(searchQuery, parseInt(limit as string));

  res.status(200).json({
    success: true,
    message: 'Users found',
    data: {
      users,
      count: users.length
    }
  });
});

/**
 * Verify token endpoint (for client-side auth state)
 */
export const verifyToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    throw createError('User not authenticated', 401);
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    throw createError('User not found', 401);
  }

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  res.status(200).json({
    success: true,
    message: 'Token is valid',
    data: {
      user: authUser,
      authenticated: true
    }
  });
});