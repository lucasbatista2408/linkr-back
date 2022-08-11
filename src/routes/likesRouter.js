import { Router } from "express";
import { addLike, deleteLike, getLikes } from "../controllers/likesController.js";

const likesRouter = Router();

//adds authentication middleware to acess userId !
likesRouter.get('/posts/:id/likes', getLikes);
likesRouter.post('/posts/:id/likes', addLike);
likesRouter.delete('/posts/:id/likes', deleteLike);

export default likesRouter;