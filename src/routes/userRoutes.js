import { Router } from 'express';
import { searchUserControler, searchUserById } from '../controllers/userController.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';

const userRouter = Router();
userRouter.get('/user',authUser, searchUserControler);
userRouter.get('/user/:id',authUser, searchUserById);

export default userRouter;