import {Router} from 'express';
import postNewUser from '../controllers/authControllers/postNewUser.js';

const authRouter = Router();

//creates a new user
authRouter.post('/signup', postNewUser);

//signs user in
authRouter.post('/', );

export default authRouter;
