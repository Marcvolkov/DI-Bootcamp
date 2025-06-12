import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // PostgreSQL specific errors
  if (error.name === 'PostgresError' || (error as any).code) {
    const pgError = error as any;
    
    switch (pgError.code) {
      case '23505': // Unique violation
        statusCode = 409;
        if (pgError.constraint?.includes('email')) {
          message = 'An account with this email already exists';
        } else if (pgError.constraint?.includes('username')) {
          message = 'This username is already taken';
        } else {
          message = 'Duplicate entry detected';
        }
        break;
        
      case '23503': // Foreign key violation
        statusCode = 400;
        message = 'Referenced resource does not exist';
        break;
        
      case '23502': // Not null violation
        statusCode = 400;
        message = 'Required field is missing';
        break;
        
      case '42P01': // Undefined table
        statusCode = 500;
        message = 'Database configuration error';
        break;
        
      default:
        statusCode = 500;
        message = 'Database operation failed';
    }
  }

  // JWT specific errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  }

  // Log error for debugging (in development) or monitoring (in production)
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Details:', {
      message: error.message,
      stack: error.stack,
      statusCode,
      url: req.url,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params
    });
  } else {
    // In production, log only essential information
    console.error('Production Error:', {
      message: error.message,
      statusCode,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }

  // Don't expose sensitive error details in production
  const response: any = {
    success: false,
    message: statusCode >= 500 && process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : message
  };

  // Add error code for client handling
  if (statusCode === 401) {
    response.code = 'UNAUTHORIZED';
  } else if (statusCode === 403) {
    response.code = 'FORBIDDEN';
  } else if (statusCode === 404) {
    response.code = 'NOT_FOUND';
  } else if (statusCode === 409) {
    response.code = 'CONFLICT';
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development' && error.stack) {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    code: 'NOT_FOUND'
  });
};

/**
 * Async error wrapper to catch async function errors
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Create custom error
 */
export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};