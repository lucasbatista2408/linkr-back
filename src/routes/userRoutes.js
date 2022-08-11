import { Router } from 'express';
import { searchUserControler } from '../controllers/userController.js';
import joiValidation from '../middlewares/joiValidation.js';
import { searchUserSchema } from '../schemas/userSchema.js';

const userRouter = Router();
userRouter.get('/user', joiValidation(searchUserSchema), searchUserControler);

export default userRouter;