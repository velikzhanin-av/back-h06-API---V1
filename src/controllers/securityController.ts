import {Request, Response} from "express";
import {securityQueryRepository} from "../repositories/security/securityQueryRepository";
import {RequestWithUser} from "../types/usersTypes";
import {securityServices} from "../services/securityServices";
import {ResultStatusHttp} from "../types/resultCode";

export const securityController = {

    async getActiveSessions(req: RequestWithUser, res: Response) {
        const activeSession = await securityQueryRepository.findActiveSessionById(req.user!._id.toString())
        res
            .status(200)
            .json(activeSession)
    },

    async deleteSessionById(req: RequestWithUser, res: Response) {
        const result = await securityServices.deleteSessionById(req.params.deviceId, req.user!._id.toString())
        res.sendStatus(ResultStatusHttp[result])
    },

    async deleteAllOtherSession(req: RequestWithUser, res: Response) {
        const result = await securityServices.deleteAllOtherSession('123', req.user!._id.toString())

    },

}