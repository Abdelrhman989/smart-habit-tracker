import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
