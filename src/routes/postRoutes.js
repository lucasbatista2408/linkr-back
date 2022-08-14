import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation.js';
import postSchema from '../schemas/postSchema.js';
import {
	createPost,
	getPost,
	getDatasUrl,
	deletePostId

} from '../controllers/postControllers.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';

const postRouter = Router();
postRouter.post('/post', joiValidation(postSchema),authUser, createPost );
postRouter.get('/post', authUser, getPost);
postRouter.get('/url-metadata', getDatasUrl);
postRouter.delete('/delete/:id', deletePostId);


export default postRouter;