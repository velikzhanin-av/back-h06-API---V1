import {Request, Response, NextFunction} from "express"
import {jwtServices} from "../utils/jwtServices";
import {RequestWithUser} from "../types/usersTypes";
import {WithId} from "mongodb";
import {SessionsDbType, UserDbType} from "../types/dbTypes";
import {securityRepository} from "../repositories/security/securityRepository";
import {usersRepository} from "../repositories/users/usersRepository";

export const authRefreshTokenMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        res.sendStatus(401)
        return
    }

    const tokenData: {iat: Date, exp: Date} | undefined = await jwtServices.getIatFromJwtToken(refreshToken)
    if (!tokenData) {
        res.sendStatus(401)
        return
    }

    const session: WithId<SessionsDbType> | null = await securityRepository.findSessionByIat(tokenData.iat)
    if (!session) {
        res.sendStatus(401)
        return
    }

    const user: WithId<UserDbType> | null = await usersRepository.findUserById(session.userId)
    if (!user) {
        res.sendStatus(401)
        return
    }
    req.user = user
    return  next()
}