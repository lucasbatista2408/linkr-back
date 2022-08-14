import { Router } from "express";
import { getHashtags } from "../controllers/hashtagsController";

const hashtagRouter = Router();

hashtagRouter.get('/hashtags', getHashtags);

export default hashtagRouter;