import {securityRepository} from "../repositories/security/securityRepository";
import {WithId} from "mongodb";
import {SessionsDbType} from "../types/dbTypes";
import {jwtServices} from "../utils/jwtServices";
import { StatusCodeHttp } from "../types/resultCode"

export const securityServices = {

    async deleteSessionById(deviceId: string, userId: string) {
        const session: WithId<SessionsDbType> | null = await securityRepository.findSessionById(deviceId)
        if (!session) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }
        if (session.userId !== userId) return {
            statusCode: StatusCodeHttp.Forbidden,
            data: null
        }
        const resultDelete = await securityRepository.deleteSessionByDeviceId(deviceId)
        if (!resultDelete) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }
        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
    },

    async deleteAllOtherSession(deviceId: string, userId: string) {
        await securityRepository.deleteSessionFromArray(deviceId, userId)
        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
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