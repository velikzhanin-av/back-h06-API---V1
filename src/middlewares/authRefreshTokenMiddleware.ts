import {Request, Response, NextFunction} from "express"
import {jwtServices} from "../utils/jwtServices";
import {RequestWithUser} from "../types/usersTypes";

export const authRefreshTokenMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if (req.originalUrl === '/security/devices') {
        console.log(token);
    }
    if (!token) {
        res.sendStatus(401)
        return
    }

    const user = await jwtServices.verifyRefreshToken(token)
    if (req.originalUrl === '/security/devices') {
        console.log(user);
    }
    if (!user) return res.sendStatus(401)
    req.user = user
    return  next()
}