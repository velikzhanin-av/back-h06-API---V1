import jwt from 'jsonwebtoken'
import {usersRepository} from "../repositories/users/usersRepository";
import {SETTINGS} from "../settings";

export const jwtServices = {
    async createJwt(userId: string, deviceId: string) {
        return jwt.sign({userId, deviceId}, SETTINGS.TOKEN_SECRET_KEY, {expiresIn: SETTINGS.ACCESS_TOKEN_TTL})
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
        return jwt.sign({userId, deviceId}, SETTINGS.TOKEN_SECRET_KEY, {expiresIn: SETTINGS.REFRESH_TOKEN_TTL})
    },


    async getDataFromJwtToken(token: string) {
        console.log(token);
        const decode = jwt.decode(token) as jwt.JwtPayload
        console.log(decode);
        if (!decode || !decode.iat || !decode.exp || !decode.deviceId) {
            return
        }
        const iat: Date = new Date(decode.iat * 1000) // Преобразуем в дату
        const exp: Date = new Date(decode.exp * 1000) // Преобразуем в дату
        const test =  {iat, exp, deviceId: decode.deviceId}
        console.log(test)
        return {iat, exp, deviceId: decode.deviceId}

    }
}