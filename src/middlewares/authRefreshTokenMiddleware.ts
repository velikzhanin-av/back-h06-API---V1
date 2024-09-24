import {Request, Response, NextFunction} from "express"
import {jwtServices} from "../utils/jwtServices";
import {RequestWithUser} from "../types/usersTypes";
import session from 'express-session'

export const authRefreshTokenMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if (!token) {
        res.sendStatus(401)
        return
    }
    const user = await jwtServices.verifyRefreshToken(token)
    if (!user) return res.sendStatus(401)
    req.user = user
    return  next()
}