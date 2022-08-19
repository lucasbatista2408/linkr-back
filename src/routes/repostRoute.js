import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation.js';
import { repostSchema } from '../schemas/repostSchema.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';
import repost from '../controllers/repostController/repost.js';
import repostCount from '../controllers/repostController/repostCount.js';


const repostRouter = Router();

//creates new repost
repostRouter.post('/repost',authUser, joiValidation(repostSchema), repost);

//gets repost count
repostRouter.get('/repost-count', repostCount);

export default repostRouter;