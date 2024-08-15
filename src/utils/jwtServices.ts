import jwt from 'jsonwebtoken'
import {usersRepository} from "../repositories/users/usersRepository";
import {SETTINGS} from "../settings";

export const jwtServices = {
    async createJwt(userId: string) {
        return jwt.sign({userId}, SETTINGS.TOKEN_SECRET_KEY, {expiresIn: '10m'})
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

    async createRefreshToken(userId: string) {
        return jwt.sign({userId}, SETTINGS.TOKEN_SECRET_KEY, {expiresIn: '20m'})
    },

    async getIatFromJwtToken(token: string) {
        const decode = jwt.decode(token) as jwt.JwtPayload
        if (!decode || !decode.iat) {
            return
        }
        const issueAt = new Date(decode.iat * 1000) // Преобразуем в дату
        console.log(issueAt);

    }
}