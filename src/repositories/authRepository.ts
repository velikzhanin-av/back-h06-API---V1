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

    async checkIpInRateLimit(ip: string, url: string) {
        try {
            return await rateLimitCollection.find({ip, url}).toArray()
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async addIpInRateLimit(ip: string,
                           url: string,
                           requestCount: number,
                           firstRequestTime: Date) {
        try {
            return await rateLimitCollection.insertOne({ip, url, requestCount, firstRequestTime})
        } catch (err) {
            console.log(err)
            return false
        }
    },
}