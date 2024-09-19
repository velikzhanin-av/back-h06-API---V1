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
    }
}