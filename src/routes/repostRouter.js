import {Router} from 'express';
import repost from '../controllers/repostController/repost.js';
import repostCount from '../controllers/repostController/repostCount.js';


const repostRouter = Router();

//creates a repost
repostRouter.post('/repost', repost);

//gets repost count
repostRouter.get('/repost-count', repostCount);


export default repostRouter;

