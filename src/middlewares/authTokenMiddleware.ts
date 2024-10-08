import {Request, Response, NextFunction} from "express"
import {jwtServices} from "../utils/jwtServices";
import {RequestWithUser} from "../types/usersTypes";


export const authTokenMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string
    if (!auth) {
        res.sendStatus(401)
        return
    }
    const token = auth.split(' ')[1]
    const user = await jwtServices.verify(token)
    if (!user) {
        return res.sendStatus(401)
    }

    req.user = user
    return  next()
 }