import {sessionsCollection} from "../../db/mongoDb";
import {SessionsDbType} from "../../types/dbTypes";

export const mapToOutputSessions = (sessions: SessionsDbType) => {
    return {
        ip: sessions.ip,
        title: sessions.deviceName,
        lastActiveDate: sessions.iat,
        deviceId: sessions.sessionId
    }
}

export const securityQueryRepository = {

    async findActiveSessionById(id: string) {
        const sessions = await sessionsCollection.find({userId: id}).toArray()
        console.log(sessions);
        sessions.map((session: SessionsDbType) => {
            return mapToOutputSessions(session)
        })
        },
}