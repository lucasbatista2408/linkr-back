import {Router} from 'express';
import postNewUser from '../controllers/userControllers/postNewUser.js';
import signInUser from '../controllers/userControllers/signInUser.js';
import signUpSchema from '../schemas/userSchema/signUpSchema.js';
import signInSchema from '../schemas/userSchema/signInSchema.js';

const router = Router();

//creates a new user
router.post('/signup', signUpSchema, postNewUser)

//signs user in
router.post('/signin', signInSchema, signInUser)

export default router;
