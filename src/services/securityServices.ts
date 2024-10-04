import {securityRepository} from "../repositories/security/securityRepository";
import {WithId} from "mongodb";
import {SessionsDbType} from "../types/dbTypes";
import {jwtServices} from "../utils/jwtServices";

export const securityServices = {

    async deleteSessionById(deviceId: string, userId: string)  {
        const session: WithId<SessionsDbType> | null = await securityRepository.findSessionById(deviceId)
        if (!session) return 'NotFound'
        if (session.userId !== userId) return 'Forbidden'
        const resultDelete = await securityRepository.deleteSessionByDeviceId(deviceId)
        if (!resultDelete) return 'NotFound'
        return 'NoContent'
    },

    async deleteAllOtherSession(deviceId: string, userId: string) {
        await securityRepository.deleteSessionFromArray(deviceId, userId)
        return 'NoContent'
    },

    async findActiveSessions(refreshToken: string) {
        const tokenData: {
            iat: Date,
            exp: Date,
            deviceId: string
        } | undefined = await jwtServices.getDataFromJwtToken(refreshToken)
        if (!tokenData) {
            return
        }

        const session: WithId<SessionsDbType> | null = await securityRepository.findSessionByIatAndDeviceId(tokenData.iat, tokenData.deviceId)
        if (!session) {
            return
        }

        return session.userId

    }
}