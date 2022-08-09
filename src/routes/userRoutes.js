import {Router} from 'express';
import postNewUser from '../controllers/userControllers/postNewUser.js';

const router = Router();

//creates a new user
router.post('/signup', postNewUser)

//signs user in
router.post('/', )

export default router;
