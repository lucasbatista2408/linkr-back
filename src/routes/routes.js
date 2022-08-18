import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import likesRouter from './likesRouter.js';
import postRouter from './postRoutes.js';
import hashtagRouter from './hashtagsRouter.js';
import repostRouter from './repostRouter.js';

const router = Router ();

router.use(authRouter);
router.use(userRouter);
router.use(likesRouter);
router.use(postRouter);
router.use(hashtagRouter);
router.use(repostRouter)

export default router;
