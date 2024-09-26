import {Request, Response} from "express";
import {securityQueryRepository} from "../repositories/security/securityQueryRepository";
import {RequestWithUser} from "../types/usersTypes";
import {securityServices} from "../services/securityServices";
import {ResultStatusHttp} from "../types/resultCode";
import {WithId} from "mongodb";
import {SessionsDbType} from "../types/dbTypes";

export const securityController = {

    async getActiveSessions(req: RequestWithUser, res: Response) {
        console.log(req.cookies);
        const userId: string | undefined = await securityServices.findUserIdBySessionId(req.cookies.sessionId)
        if (!userId) {
            res.sendStatus(401)
            return
        }
        const activeSession: activeSession[] | undefined = await securityQueryRepository.findActiveSessionByUserId(userId)
        res
            .status(200)
            .json(activeSession)


        // const activeSession = await securityQueryRepository.()
        // res
        //     .status(200)
        //     .json(activeSession)
    },

    async deleteSessionById(req: RequestWithUser, res: Response) {
        const result = await securityServices.deleteSessionById(req.params.deviceId, req.user!._id.toString())
        res.sendStatus(ResultStatusHttp[result])
    },

    async deleteAllOtherSession(req: RequestWithUser, res: Response) {
        const result = await securityServices.deleteAllOtherSession('123', req.user!._id.toString())

    },

}

type activeSession = {
    ip: string
    title: string
    lastActiveDate: Date
    deviceId: string
}