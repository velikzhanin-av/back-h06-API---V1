import {Request, Response, NextFunction} from "express"
import {jwtServices} from "../utils/jwtServices";

export const authRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if (!token) {
        res.sendStatus(401)
        return
    }
    const user = await jwtServices.verifyRefreshToken(token)
    if (!user) return res.sendStatus(401)
    // @ts-ignore
    req.user = user
    return  next()
}