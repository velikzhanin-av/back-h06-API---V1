import {sessionsCollection} from "../../db/mongoDb";
import {SessionsDbType} from "../../types/dbTypes";

export const mapToOutputSessions = (sessions: SessionsDbType) => {
    return {
        ip: sessions.ip,
        title: sessions.deviceName,
        lastActiveDate: sessions.iat,
        deviceId: sessions.deviceId
    }
}

export const securityQueryRepository = {

    async findActiveSessionByUserId(userId: string) {
        const sessions = await sessionsCollection.find({userId}).toArray()
        if (!sessions) return
        return sessions.map((session: SessionsDbType) => {
            return mapToOutputSessions(session)
        })
        },
}