import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

/**
 * General rate limiting
 */
export const generalRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Strict rate limiting for auth endpoints
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiting for story creation
 */
export const storyCreationRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 story creations per minute
  message: {
    success: false,
    message: 'Too many stories created, please slow down.',
    code: 'CREATION_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Security headers configuration
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

/**
 * Sanitize input to prevent XSS and injection attacks
 */
export const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {
  // Remove any potential script tags or dangerous HTML
  const sanitizeString = (str: string): string => {
    if (typeof str !== 'string') return str;
    
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    
    if (obj !== null && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitized[key] = sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }
    
    return obj;
  };

  // Sanitize request body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  next();
};

/**
 * CORS configuration
 */
export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

/**
 * Request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      timestamp: new Date().toISOString()
    };

    // Log only in development or for errors
    if (process.env.NODE_ENV === 'development' || res.statusCode >= 400) {
      console.log('Request:', logData);
    }
  });

  next();
};

/**
 * Security middleware to check for suspicious activity
 */
export const securityCheck = (req: Request, res: Response, next: NextFunction): void => {
  const suspiciousPatterns = [
    /(\<|%3C)script(.|\s)*?(\>|%3E)/i, // Script tags
    /(union\s+select|drop\s+table|delete\s+from)/i, // SQL injection patterns
    /(\.\.\/)|(\.\.\\)/i, // Path traversal
    /(javascript\s*:|vbscript\s*:|onload\s*=|onerror\s*=)/i // XSS patterns
  ];

  const checkString = (str: string): boolean => {
    return suspiciousPatterns.some(pattern => pattern.test(str));
  };

  const checkObject = (obj: any): boolean => {
    if (typeof obj === 'string') {
      return checkString(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.some(checkObject);
    }
    
    if (obj !== null && typeof obj === 'object') {
      return Object.values(obj).some(checkObject);
    }
    
    return false;
  };

  // Check URL
  if (checkString(req.url)) {
    console.warn('Suspicious URL detected:', req.url, 'from IP:', req.ip);
    res.status(400).json({
      success: false,
      message: 'Invalid request',
      code: 'SUSPICIOUS_REQUEST'
    });
    return;
  }

  // Check request body
  if (req.body && checkObject(req.body)) {
    console.warn('Suspicious request body detected from IP:', req.ip);
    res.status(400).json({
      success: false,
      message: 'Invalid request data',
      code: 'SUSPICIOUS_REQUEST'
    });
    return;
  }

  // Check query parameters
  if (req.query && checkObject(req.query)) {
    console.warn('Suspicious query parameters detected from IP:', req.ip);
    res.status(400).json({
      success: false,
      message: 'Invalid query parameters',
      code: 'SUSPICIOUS_REQUEST'
    });
    return;
  }

  next();
};