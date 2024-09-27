import {securityRepository} from "../repositories/security/securityRepository";
import {WithId} from "mongodb";
import {SessionsDbType} from "../types/dbTypes";
import {jwtServices} from "../utils/jwtServices";

export const securityServices = {

    async deleteSessionById(id: string, userId: string)  {
        const session: WithId<SessionsDbType> | null = await securityRepository.findSessionById(id)
        if (!session) return 'NotFound'
        if (session.userId !== userId) return 'Forbidden'
        const resultDelete = await securityRepository.deleteSession(id)
        return 'NoContent'
    },

    async deleteAllOtherSession(sessionId: string, userId: string) {
        const sessions: WithId<SessionsDbType>[] = await securityRepository.findSessionByUserId(userId)
        let sessionsForDelete = []
        for (let s of sessions) {
            if (s.deviceName !== sessionId) {
                sessionsForDelete.push(s.deviceName)
            }
        }
        await securityRepository.deleteSessionFromArray(sessionsForDelete, userId)
        return 'NoContent'
    },

    async findActiveSessions(refreshToken: string) {
        const tokenData: {iat: Date, exp: Date} | undefined = await jwtServices.getIatFromJwtToken(refreshToken)
        if (!tokenData) {
            return
        }

        const session: WithId<SessionsDbType> | null = await securityRepository.findSessionByIat(tokenData.iat)
        if (!session) {
            return
        }

        return session.userId

    }
}