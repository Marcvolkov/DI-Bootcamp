import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@storytelling/types';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        iat: number;
        exp: number;
      };
    }
  }
}

/**
 * Middleware to authenticate JWT token
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access token required'
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET not configured');
    res.status(500).json({
      success: false,
      message: 'Server configuration error'
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Access token expired',
        code: 'TOKEN_EXPIRED'
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Invalid access token',
        code: 'INVALID_TOKEN'
      });
      return;
    }

    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

/**
 * Middleware to optionally authenticate token (doesn't fail if no token)
 */
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    next();
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    next();
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    req.user = decoded;
  } catch (error) {
    // Silently fail for optional auth
    console.warn('Optional auth token verification failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  next();
};

/**
 * Generate access token
 */
export const generateAccessToken = (userId: number): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET not configured');
  }

  return jwt.sign(
    { userId },
    jwtSecret,
    { expiresIn: '15m' }
  );
};

/**
 * Generate refresh token
 */
export const generateRefreshToken = (userId: number): string => {
  const refreshSecret = process.env.REFRESH_SECRET;
  if (!refreshSecret) {
    throw new Error('REFRESH_SECRET not configured');
  }

  return jwt.sign(
    { userId },
    refreshSecret,
    { expiresIn: '7d' }
  );
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): JWTPayload => {
  const refreshSecret = process.env.REFRESH_SECRET;
  if (!refreshSecret) {
    throw new Error('REFRESH_SECRET not configured');
  }

  return jwt.verify(token, refreshSecret) as JWTPayload;
};