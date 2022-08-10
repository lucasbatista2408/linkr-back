import {Router} from 'express';
import postNewUser from '../controllers/authControllers/postNewUser.js';
import signInUser from '../controllers/authControllers/signInUser.js.js';
import signUpSchema from '../schemas/authSchema/signUpSchema.js';
import signInSchema from '../schemas/authSchema/signInSchema.js';

const router = Router();

//creates a new user
router.post('/signup', signUpSchema, postNewUser)

//signs user in
router.post('/signin', signInSchema, signInUser)

export default router;
