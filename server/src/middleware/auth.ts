import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; //added

dotenv.config(); //New

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object

  //Obtain authorization header and extract token

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // if there's no token then access is denied

if (!token) {
  return res.status(401).json({ message: 'Access denied. No token provided.'});
}

try {
  // Verify token using secret key
  const secret = process.env.JWT_SECRET || 'fallbackSecret';
  const decoded = jwt.verify(token, secret) as JwtPayload;

  // Add used data to request
  (req as any).user = decoded;

  //Go to next middleware/controller
  next();
  return;
} catch (err) {
  // in case token verification fail
return res.status(403).json({ message: 'Invalid or expired token.'});
}
};
