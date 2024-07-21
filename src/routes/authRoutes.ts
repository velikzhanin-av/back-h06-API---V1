import {Router} from "express";
import {authController} from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";

export const authRouter = Router()

authRouter.post('/login', authController.postLogin)
authRouter.get('/me', authTokenMiddleware,
    authController.getUserInfo)