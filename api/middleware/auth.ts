import { Request, Response, NextFunction } from 'express';

export function validateApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'API Key is required. Please provide X-API-Key header.'
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid API Key.'
    });
  }

  next();
}
