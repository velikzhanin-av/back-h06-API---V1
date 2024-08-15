import {Request, Response} from "express";
import {securityQueryRepository} from "../repositories/security/securityQueryRepository";
import {RequestWithUser} from "../types/usersTypes";

export const securityController = {

    async getActiveSessions(req: RequestWithUser, res: Response) {
        const activeSession = await securityQueryRepository.findActiveSessionById(req.user!._id.toString())
        res
            .status(200)
            .json(activeSession)
    },
}