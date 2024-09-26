import {ObjectId, WithId} from "mongodb";
import {sessionsCollection} from "../../db/mongoDb";
import {SessionsDbType} from "../../types/dbTypes";
import {mapToOutputSessions} from "./securityQueryRepository";

export const securityRepository = {

    async deleteSession(id: string) {
        try {
            const result = await sessionsCollection.deleteOne({_id: new ObjectId(id)})
            return result.deletedCount
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async deleteSessionFromArray(sessions: Array<string>, userId: string) {
        try {
            return await sessionsCollection.deleteMany({
                deviceName: {$in: sessions},
                userId
            })
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async findSessionById(id: string) {
        return await sessionsCollection.findOne({_id: new ObjectId(id)})
    },

    async findSessionByUserId(userId: string) {
        return await sessionsCollection.find({userId: userId}).toArray()
    },

}