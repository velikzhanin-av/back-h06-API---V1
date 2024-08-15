import {Request, Response} from "express"
import {authServices} from "../services/authServices";
import { RequestWithUser } from "../types/usersTypes";

export const authController = {
    async postLogin(req: Request, res: Response) {
        const result = await authServices.login(req.body)
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
        if (result.isExist) {
            res
                .status(400)
                .json({
                    "errorsMessages": [
                        {
                            "message": `${result.isExist} already exists`,
                            "field": result.isExist
                        }
                    ]
                })
            return
        }
        if (!result.sendEmail) {
            res
                .status(400)
                .json({
                    "errorsMessages": [
                        {
                            "message": `Email not send`,
                            "field": 'email'
                        }
                    ]
                })
            return
        }
        res.sendStatus(204)
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

    async refreshToken(req: Request, res: Response) {
        // @ts-ignore
        const result = await authServices.refreshToken(req.cookies.refreshToken, req.user)
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

    async logout(req: Request, res: Response) {
        // @ts-ignore
        const result = await authServices.logout(req.cookies.refreshToken, req.user)
        if (!result) {
            res.sendStatus(401)
            return
        }

        res.sendStatus(204)
    }
}