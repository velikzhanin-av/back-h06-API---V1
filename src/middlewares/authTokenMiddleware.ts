import {Request, Response, NextFunction} from "express"
import {jwtServices} from "../utils/jwtServices";

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string
    if (!auth) {
        res.sendStatus(401)
        return
    }
    const token = auth.split(' ')[1]
    const user = await jwtServices.verify(token)
    if (!user) return res.sendStatus(401)
    // @ts-ignore
    req.user = user
    return  next()
}