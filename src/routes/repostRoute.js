import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation.js';
import { repostSchema } from '../schemas/repostSchema.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';


const repostRouter = Router();

repostRouter.post('/repost',authUser, joiValidation(repostSchema));

export default repostRouter;