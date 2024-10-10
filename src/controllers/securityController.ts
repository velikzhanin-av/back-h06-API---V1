import {Request, Response} from "express";
import {securityQueryRepository} from "../repositories/security/securityQueryRepository";
import {RequestWithUser} from "../types/usersTypes";
import {securityServices} from "../services/securityServices";
import {WithId} from "mongodb";
import {SessionsDbType} from "../types/dbTypes";
import {jwtServices} from "../utils/jwtServices";
import {securityRepository} from "../repositories/security/securityRepository";

export const securityController = {

    async getActiveSessions(req: RequestWithUser, res: Response) {
        const activeSession: activeSession[] | undefined = await securityQueryRepository.findActiveSessionByUserId(req.user!._id.toString())
        res
            .status(200)
            .json(activeSession)

    },

    async deleteSessionById(req: RequestWithUser, res: Response) {
        const result: ResultCode<null> = await securityServices.deleteSessionById(req.params.deviceId, req.user!._id.toString())
        res.sendStatus(result.statusCode)
    },

    async deleteAllOtherSession(req: RequestWithUser, res: Response) {
        const result: string | undefined = await securityServices.deleteAllOtherSession(req.tokenData!.deviceId, req.user!._id.toString())
        res.sendStatus(204)
    },

}

type activeSession = {
    ip: string
    title: string
    lastActiveDate: Date
    deviceId: string
}