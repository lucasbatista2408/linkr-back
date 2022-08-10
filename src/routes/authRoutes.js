import {Router} from 'express';
import postNewUser from '../controllers/authControllers/postNewUser.js';
import signInUser from '../controllers/authControllers/signInUser.js';
import signUpSchema from '../schemas/authSchema/signUpSchema.js';
import signInSchema from '../schemas/authSchema/signInSchema.js';

const authRouter = Router();

//creates a new user
authRouter.post('/signup', signUpSchema, postNewUser);

//signs user in
authRouter.post('/signin', signInSchema, signInUser);

export default authRouter;

