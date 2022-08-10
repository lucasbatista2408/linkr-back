import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';

const router =Router ();

router.use(authRouter);
router.use(userRouter);

export default router;