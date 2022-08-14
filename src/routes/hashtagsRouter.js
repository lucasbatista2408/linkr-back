import { Router } from "express";
import { getHashtag, getTrendingHashtags } from "../controllers/hashtagsController.js";
import { authUser } from "../middlewares/authMiddleware/authUser.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtag/:hashtag',authUser, getHashtag);
hashtagRouter.get('/trending', getTrendingHashtags)

export default hashtagRouter;