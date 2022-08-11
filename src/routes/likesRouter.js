import { Router } from 'express';
import { addLike, deleteLike, getLikes } from '../controllers/likesController.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';
const likesRouter = Router();

//adds authentication middleware to acess userId !
likesRouter.get('/posts/:id/likes', authUser, getLikes);
likesRouter.post('/posts/:id/likes', authUser, addLike);
likesRouter.delete('/posts/:id/likes', authUser, deleteLike);

export default likesRouter;