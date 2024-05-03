import {Request, Response, NextFunction} from "express"

export const ADMIN_AUTH = 'admin:qwerty' // get from SETTINGS
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string // 'Basic xxxx'
    if (!auth) {
        res.sendStatus(401)
        return
    }
    const buff = Buffer.from(auth.slice(6), 'base64')

    const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    // if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
    if (auth.slice(6) !== codedAuth || auth.slice(0, 6) !== 'Basic ') {
        res.sendStatus(401)
        return
    }
    next()
}