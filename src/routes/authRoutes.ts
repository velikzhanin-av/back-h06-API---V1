import {Router} from "express";
import {authController} from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {
    authInputValidation, codeValidation,
    emailValidation,
    loginValidation, newPasswordValidation,
    passwordValidation
} from "../middlewares/authInputValidation";
import {authRefreshTokenMiddleware} from "../middlewares/authRefreshTokenMiddleware";
import {authRateLimitMiddleware} from "../middlewares/authRateLimitMiddleware";

export const authRouter = Router()

authRouter.post('/login',
    authRateLimitMiddleware,
    authController.postLogin)
authRouter.get('/me', authTokenMiddleware,
    authController.getUserInfo)
authRouter.post('/registration',
    authRateLimitMiddleware,
    loginValidation,
    passwordValidation,
    emailValidation,
    authInputValidation,
    authController.registration)
authRouter.post('/registration-confirmation',
    authRateLimitMiddleware,
    codeValidation,
    authInputValidation,
    authController.registrationConfirmation)
authRouter.post('/registration-email-resending',
    authRateLimitMiddleware,
    emailValidation,
    authInputValidation,
    authController.registrationEmailResending)
authRouter.post('/refresh-token',
    authRefreshTokenMiddleware,
    authController.refreshToken)
authRouter.post('/logout',
    authRefreshTokenMiddleware,
    authController.logout)
authRouter.post('/password-recovery',
    authRateLimitMiddleware,
    emailValidation,
    authInputValidation,
    authController.passwordRecovery)
authRouter.post('/new-password',
    authRateLimitMiddleware,
    newPasswordValidation,
    authInputValidation,
    authController.newPassword)