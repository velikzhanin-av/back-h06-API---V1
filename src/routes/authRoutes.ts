import {Router} from "express";
import {authController} from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {
    authInputValidation,
    emailValidation,
    loginValidation,
    passwordValidation
} from "../middlewares/authInputValidation";

export const authRouter = Router()

authRouter.post('/login', authController.postLogin)
authRouter.get('/me', authTokenMiddleware,
    authController.getUserInfo)
authRouter.post('/registration',
    loginValidation,
    passwordValidation,
    emailValidation,
    authInputValidation,
    authController.registration)
authRouter.post('/registration-confirmation', authController.registration)
authRouter.post('/registration-email-resending',
    emailValidation,
    authInputValidation,
    authController.postLogin)
