import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation.js';
import postSchema from '../schemas/postSchema.js';
import {
	createPost,
	getPost,
	getDatasUrl 
} from '../controllers/postControllers.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';

const postRouter = Router();
postRouter.post('/post', joiValidation(postSchema),authUser, createPost );
postRouter.get('/post', authUser, getPost);
postRouter.get('/url-metadata', getDatasUrl);

export default postRouter;