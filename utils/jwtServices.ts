import jwt from 'jsonwebtoken'

export const jwtServices = {
    async createJwt(userId: string) {
        return jwt.sign(userId, '111')
    },


}