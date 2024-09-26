import {securityRepository} from "../repositories/security/securityRepository";
import {WithId} from "mongodb";
import {SessionsDbType} from "../types/dbTypes";

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

    async findUserIdBySessionId(sessionId: string) {
        const user: WithId<SessionsDbType> | null = await securityRepository.findSessionById(sessionId)
        if (!user) return
        return user.userId.toString()

        // // TODO узнать как правильно. запрашивать здест или отдавать в контроллер и оттуда уже запрос в квери репозиторий
        // return await securityRepository.findSessionByUserId(user._id.toString())

    }
}