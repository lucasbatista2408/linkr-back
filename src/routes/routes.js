import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import likesRouter from './likesRouter.js';
import postRouter from './postRoutes.js';
import hashtagRouter from './hashtagsRouter.js';
import commentRouter from './commentsRoutes.js';
import followsRouter from './followsRouter.js';
import repostRouter from './repostRoute.js';

const router = Router ();

router.use(authRouter);
router.use(userRouter);
router.use(likesRouter);
router.use(postRouter);
router.use(hashtagRouter);
router.use(commentRouter);
router.use(followsRouter);
router.use(repostRouter);

export default router;
