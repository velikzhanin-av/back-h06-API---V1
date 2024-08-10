import {Router} from "express";
import {authController} from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {
    authInputValidation, codeValidation,
    emailValidation,
    loginValidation,
    passwordValidation
} from "../middlewares/authInputValidation";
import {authRefreshTokenMiddleware} from "../middlewares/authRefreshTokenMiddleware";

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
authRouter.post('/registration-confirmation',
    codeValidation,
    authInputValidation,
    authController.registrationConfirmation)
authRouter.post('/registration-email-resending',
    emailValidation,
    authInputValidation,
    authController.registrationEmailResending)
authRouter.post('/refresh-token',
    authRefreshTokenMiddleware,
    authController.refreshToken
    )
authRouter.post('/logout',
    authRefreshTokenMiddleware,
    authController.logout)