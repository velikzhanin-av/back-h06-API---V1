import {Router} from "express";
import {securityQueryRepository} from "../repositories/security/securityQueryRepository";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {securityController} from "../controllers/securityController";

export const securityRouter = Router()

securityRouter.get('/devices',
    authTokenMiddleware,
    securityController.getActiveSessions)
securityRouter.delete('/devices/:deviceId',
    authTokenMiddleware,
    securityController.deleteSessionById
    )