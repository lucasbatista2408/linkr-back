import { Router} from 'express';
import likesRouter from './likesRouter.js';

const router = Router();

router.use(likesRouter);

export default router;
