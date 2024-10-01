import jwt from 'jsonwebtoken'
import {usersRepository} from "../repositories/users/usersRepository";
import {SETTINGS} from "../settings";

export const jwtServices = {
    async createJwt(userId: string, deviceId: string) {
        return jwt.sign({userId, deviceId}, SETTINGS.TOKEN_SECRET_KEY, {expiresIn: '10s'})
    },

    async verify(token: string) {
        try {
            jwt.verify(token, SETTINGS.TOKEN_SECRET_KEY)
        } catch (err) {
            return
        }
        return await usersRepository.verifyJwtToken(token)
    },

    async verifyRefreshToken(token: string) {
        try {
            jwt.verify(token, SETTINGS.TOKEN_SECRET_KEY)
        } catch (err) {
            return
        }

        return await usersRepository.verifyRefreshToken(token)
    },

    async createRefreshToken(userId: string, deviceId: string) {
        return jwt.sign({userId, deviceId}, SETTINGS.TOKEN_SECRET_KEY, {expiresIn: '20s'})
    },


    async getDataFromJwtToken(token: string) {
        const decode = jwt.decode(token) as jwt.JwtPayload
        if (!decode || !decode.iat || !decode.exp || !decode.deviceId) {
            return
        }
        const iat: Date = new Date(decode.iat * 1000) // Преобразуем в дату
        const exp: Date = new Date(decode.exp * 1000) // Преобразуем в дату

        return {iat, exp, deviceId: decode.deviceId}

    }
}