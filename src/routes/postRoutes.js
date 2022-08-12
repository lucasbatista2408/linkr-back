import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation.js';
import postSchema from '../schemas/postSchema.js';
import { createPost, getPost } from '../controllers/postControllers.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';

const postRouter = Router();
postRouter.post('/post', joiValidation(postSchema),authUser, createPost );
postRouter.get('/post', authUser, getPost);

export default postRouter;