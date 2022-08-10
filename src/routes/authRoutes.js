import {Router} from 'express';
import postNewUser from '../controllers/authControllers/postNewUser.js';

import signInUser from '../controllers/authControllers/signInUser.js';
import joiValidation from '../middlewares/joiValidation.js';
import { signInschema } from '../schemas/authSchema/signInSchema.js';
import { signUpschema } from '../schemas/authSchema/signUpSchema.js';

const authRouter = Router();

//creates a new user
authRouter.post('/signup', joiValidation(signUpschema), postNewUser);

//signs user in
authRouter.post('/signin', joiValidation(signInschema), signInUser);

export default authRouter;

