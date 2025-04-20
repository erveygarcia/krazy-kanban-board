import { Router } from 'express';
import { ticketRouter } from './ticket-routes';
import { userRouter } from './user-routes';

const router = Router();

router.use('/tickets', ticketRouter);
router.use('/users', userRouter);

export default router;
