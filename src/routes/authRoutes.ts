import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {usersRouter} from "./users/routes";
import {postLogin} from "../controllers/authController";

export const authRouter = Router()

authRouter.post('/login', postLogin)