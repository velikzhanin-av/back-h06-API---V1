import {Router} from "express";
import {securityQueryRepository} from "../repositories/security/securityQueryRepository";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {securityController} from "../controllers/securityController";
import {authRefreshTokenMiddleware} from "../middlewares/authRefreshTokenMiddleware";

export const securityRouter = Router()

securityRouter.get('/devices',
    authRefreshTokenMiddleware,
    securityController.getActiveSessions)
securityRouter.delete('/devices/:deviceId',
    authRefreshTokenMiddleware,
    securityController.deleteSessionById
    )
securityRouter.delete('/devices',
    authRefreshTokenMiddleware,
    securityController.deleteAllOtherSession
)