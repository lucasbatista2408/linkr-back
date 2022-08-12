import { Router } from 'express';
import { searchUserControler } from '../controllers/userController.js';
import { authUser } from '../middlewares/authMiddleware/authUser.js';

const userRouter = Router();
userRouter.get('/user/:username',authUser, searchUserControler);

export default userRouter;