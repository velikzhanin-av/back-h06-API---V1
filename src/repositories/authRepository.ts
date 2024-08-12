import {tokenBlackListCollection} from "../db/mongoDb";

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
}