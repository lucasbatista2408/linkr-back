import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';
import commentSchema from '../schemas/commentSchema.js';
import { getComments, postComments } from '../controllers/commentsController.js';

const commentRouter = Router();

commentRouter.get('/comment/:postId', authUser, getComments);
commentRouter.post('/comment' ,authUser, joiValidation(commentSchema), postComments);

export default commentRouter;