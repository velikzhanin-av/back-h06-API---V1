import {rateLimitCollection, sessionsCollection, tokenBlackListCollection} from "../db/mongoDb";

export const authRepository = {
    async addTokenToBlackList(refreshToken: string, userId: string) {
        try {
            const res = await tokenBlackListCollection.insertOne({refreshToken, userId})
            return res.acknowledged
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async checkRefreshTokenInBlackList(refreshToken: string) {
        try {
            return await tokenBlackListCollection.findOne({refreshToken})
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async createSession(dataSession: {
        userId: string,
        deviceId: string,
        iat: Date,
        exp: Date,
        ip: string,
        deviceName: string,
    }) {
        try {
            return await sessionsCollection.insertOne(dataSession)
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async checkRateLimit(ip: string,
                         url: string,
                         checkDate: number) {
        try {
            return await rateLimitCollection.countDocuments({ip, url, date: {$gte: checkDate}})
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async addIpInRateLimit(ip: string,
                           url: string,
                           date: number) {
        try {
            return await rateLimitCollection.insertOne({ip, url, date})
        } catch (err) {
            console.log(err)
            return false
        }
    },
}