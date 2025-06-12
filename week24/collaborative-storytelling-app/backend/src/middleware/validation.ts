import { body, validationResult, param, query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Handle validation errors
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map(error => ({
      field: 'param' in error ? error.param : 'unknown',
      message: error.msg,
      value: 'value' in error ? error.value : undefined
    }));

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    });
    return;
  }
  
  next();
};

/**
 * User registration validation
 */
export const validateUserRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
    
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
    
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one letter and one number'),
    
  handleValidationErrors
];

/**
 * User login validation
 */
export const validateUserLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
    
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
    
  handleValidationErrors
];

/**
 * Story creation validation
 */
export const validateStoryCreation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
    
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required and cannot be empty'),
    
  handleValidationErrors
];

/**
 * Story update validation
 */
export const validateStoryUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
    
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty'),
    
  // At least one field should be present
  body()
    .custom((value, { req }) => {
      if (!req.body.title && !req.body.content) {
        throw new Error('At least one field (title or content) must be provided for update');
      }
      return true;
    }),
    
  handleValidationErrors
];

/**
 * Contributor addition validation
 */
export const validateAddContributor = [
  body('story_id')
    .isInt({ min: 1 })
    .withMessage('Valid story ID is required'),
    
  body('user_id')
    .isInt({ min: 1 })
    .withMessage('Valid user ID is required'),
    
  handleValidationErrors
];

/**
 * ID parameter validation
 */
export const validateIdParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid ID is required'),
    
  handleValidationErrors
];

/**
 * Story ID parameter validation
 */
export const validateStoryIdParam = [
  param('story_id')
    .isInt({ min: 1 })
    .withMessage('Valid story ID is required'),
    
  handleValidationErrors
];

/**
 * Query parameters validation for story listing
 */
export const validateStoryQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  query('author_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer'),
    
  query('search')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Search term cannot exceed 255 characters'),
    
  handleValidationErrors
];

/**
 * User profile update validation
 */
export const validateUserUpdate = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
    
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
    
  // At least one field should be present
  body()
    .custom((value, { req }) => {
      if (!req.body.username && !req.body.email) {
        throw new Error('At least one field (username or email) must be provided for update');
      }
      return true;
    }),
    
  handleValidationErrors
];

/**
 * Search users validation
 */
export const validateUserSearch = [
  query('q')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
    
  handleValidationErrors
];