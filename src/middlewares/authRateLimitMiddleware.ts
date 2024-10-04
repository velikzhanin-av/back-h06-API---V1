import {RequestWithUser} from "../types/usersTypes";
import {NextFunction, Response} from "express";
import {authRepository} from "../repositories/authRepository";

export const authRateLimitMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const ip = req.ip || '0.0.0.0'
    const url = req.originalUrl
    const checkDate = Date.now() - 10 * 1000

    const addLog = await authRepository.addIpInRateLimit(ip, url, Date.now())

    let count  = await authRepository.checkRateLimit(ip, url, checkDate)
    if (!count) return next()

    if (count > 5) {
        res.sendStatus(429)
        return
    }

    return next()

    }
