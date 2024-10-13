import {ObjectId, WithId} from "mongodb";
import {sessionsCollection} from "../../db/mongoDb";
import {SessionsDbType} from "../../types/dbTypes";
import {mapToOutputSessions} from "./securityQueryRepository";

export const securityRepository = {

    async deleteSessionByDeviceId(deviceId:string) {
        try {
            const result = await sessionsCollection.deleteOne({deviceId})
            return result.deletedCount
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async deleteSessionFromArray(deviceId: string, userId: string) {
        try {
            return await sessionsCollection.deleteMany({userId, deviceId: {$ne: deviceId}});
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async findSessionById(deviceId: string) {
        return await sessionsCollection.findOne({deviceId})
    },


    async findSessionByUserId(userId: string) {
        return await sessionsCollection.find({userId: userId}).toArray()
    },

    async findSessionByIatAndDeviceId(iat: Date, deviceId: string) {
        const result = await sessionsCollection.findOne({iat, deviceId})
        return result
    },

    // async findUserIdByIat(iat: Date) {
    //     const session: WithId<SessionsDbType> | null = await this.findSessionByIat(iat)
    //     if (!session) return
    //     return session
    // },

    async updateIat(id: ObjectId, iat: Date, exp: Date) {
        const result = await sessionsCollection.updateOne({_id: id}, {$set: {iat, exp}})
        return result.modifiedCount
    },

}