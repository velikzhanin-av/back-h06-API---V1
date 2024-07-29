import jwt from 'jsonwebtoken'
import {usersRepository} from "../repositories/users/usersRepository";

export const jwtServices = {
    async createJwt(userId: string) {
        return jwt.sign(userId, '111')
    },

    async verify(token: string) {
        return await usersRepository.verifyJwtToken(token)
    }


}