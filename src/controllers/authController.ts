import {NextFunction, Request, Response} from "express"
import {authServices} from "../services/authServices";
import { RequestWithUser } from "../types/usersTypes";
import {ResultCode} from "../types/resultCode";

export const authController = {
    async postLogin(req: RequestWithUser, res: Response) {
        const result = await authServices.login({
            loginOrEmail: req.body.loginOrEmail,
            password: req.body.password,
            userAgent: req.headers['user-agent'] || '',
            ip: req.ip || ''
        })
        if (!result) {
            res.sendStatus(401)
            return
        }
        res
            .cookie('refreshToken',
                result.refreshToken,
                {httpOnly: true, secure: true})
            .cookie('sessionId',
                result.sessionId,
                {httpOnly: true, secure: true})
            .cookie('deviceId',
                result.deviceId,
                {httpOnly: true, secure: true})
            .status(200)
            .json({accessToken: result.accessToken})
        return
    },

    async getUserInfo(req: RequestWithUser, res: Response) {
        const user = req.user
        res.status(200).json({
            email: user!.email,
            login: user!.login,
            userId: user!._id
        })
        return
    },

    async registration(req: Request, res: Response) {
        const result = await authServices.registerUser(req.body.login, req.body.password, req.body.email)
        if (result.data === 'login' || result.data === 'email') {
            res
                .status(result.statusCode)
                .json({
                    "errorsMessages": [
                        {
                            "message": `${result.data} already exists`,
                            "field": result.data
                        }
                    ]
                })
            return
        }

        if (result.data === 'Email not send') {
            res
                .status(result.statusCode)
                .json({
                    "errorsMessages": [
                        {
                            "message": result.data,
                            "field": 'email'
                        }
                    ]
                })
            return
        }

        res.sendStatus(result.statusCode)
    },

    async registrationEmailResending(req: Request, res: Response) {
        const result = await authServices.registrationEmailResending(req.body.email)
        if (!result.emailIsExist) {
            res
                .status(400)
                .json({
                    "errorsMessages": [
                        {
                            "message": `invalid email`,
                            "field": 'email'
                        }
                    ]
                })
            return
        } else if (result.emailIsConfirmed) {
            res
                .status(400)
                .json({
                    "errorsMessages": [
                        {
                            "message": `email already confirmed`,
                            "field": 'email'
                        }
                    ]
                })
            return
        }
        res.sendStatus(204)
        return
    },

    async registrationConfirmation(req: Request, res: Response) {
        const result = await authServices.registrationConfirmation(req.body.code)
        if (!result.codeIsExist) {
            res
                .status(400)
                .json({
                    "errorsMessages": [
                        {
                            "message": `invalid code`,
                            "field": 'code'
                        }
                    ]
                })
            return
        } else if (result.emailIsConfirmed) {
            res
                .status(400)
                .json({
                    "errorsMessages": [
                        {
                            "message": `email already confirmed`,
                            "field": 'code'
                        }
                    ]
                })
            return
        }
        res.sendStatus(204)
        return
    },

    async refreshToken(req: RequestWithUser, res: Response) {
        const result = await authServices.refreshToken(req.tokenData!, req.user)
        if (!result) {
            res.sendStatus(401)
            return
        }

        res
            .cookie('refreshToken',
                result.refreshToken,
                {httpOnly: true, secure: true})
            .status(200)
            .json({accessToken: result.accessToken})
        return
    },

    async logout(req: RequestWithUser, res: Response) {
        const result = await authServices.logout(req.tokenData!.deviceId)
        if (!result) {
            res.sendStatus(401)
            return
        }
        res.sendStatus(204)
    },

    async passwordRecovery(req: RequestWithUser, res: Response) {
        const result: ResultCode<null> = await authServices.passwordRecovery(req.body.email)
        res.sendStatus(result.statusCode)
    },

    async newPassword(req: RequestWithUser, res: Response) {
        const result = await authServices.newPassword(req.body.recoveryCode, req.body.newPassword)
        if (result.data) {
            res
                .status(result.statusCode)
                .json(result.data)
            return
        }
        res.sendStatus(result.statusCode)
    },
}