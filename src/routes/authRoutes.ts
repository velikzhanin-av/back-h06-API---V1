import {Router} from "express";
import {authController} from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";

export const authRouter = Router()

authRouter.post('/login', authController.postLogin)
authRouter.get('/me', authController.getUserInfo)