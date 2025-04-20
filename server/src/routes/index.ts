import { Router } from 'express';
import authRoutes from './auth-routes';
import apiRoutes from './api/index';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes

// Protect all routes /api with the middleware of authentication
router.use('/api', authenticateToken, apiRoutes);

export default router;
