import {RequestWithUser} from "../types/usersTypes";
import {NextFunction, Response} from "express";
import {authRepository} from "../repositories/authRepository";

export const authRateLimitMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const ip = req.ip
    const url = req.originalUrl
    const currentTime = new Date()
    const timeWindow = 10 * 1000
    const maxRequests = 5

    if (!ip) return next()
    const checkIp = await authRepository.checkIpInRateLimit(ip, url)
    if (!checkIp) {
        const addLog = await authRepository.addIpInRateLimit(ip, url, 1, currentTime)
        return next()
    }

    if (!checkIp.length) {
        const addLog = await authRepository.addIpInRateLimit(ip, url, 1, currentTime)
        return next()
    }

    const addLog = await authRepository.addIpInRateLimit(ip, url, 1, currentTime)

    if (currentTime.getTime() - checkIp[checkIp.length - 1].firstRequestTime.getTime() > timeWindow) return next()
    if (checkIp.length > maxRequests) return res.sendStatus(429)
    return next()
    }
