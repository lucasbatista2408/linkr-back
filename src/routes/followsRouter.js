import { Router } from "express";
import { createFollower, deleteFollower, getFollowers } from "../controllers/followsController.js";
import { authUser } from "../middlewares/authMiddleware/authUser.js";
import followMiddleware from "../middlewares/followMiddleware.js";

const followsRouter = Router();

followsRouter.get('/follows/:id', authUser, followMiddleware, getFollowers);
followsRouter.post('/follows/:id', authUser,followMiddleware, createFollower);
followsRouter.delete('/follows/:id', authUser, followMiddleware, deleteFollower);

export default followsRouter;