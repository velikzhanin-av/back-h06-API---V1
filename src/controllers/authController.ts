import {Request, Response} from "express"
import {authServices} from "../services/authServices";

export const authController = {
    async postLogin(req: Request, res: Response) {
        const result = await authServices.login(req.body)
        if (!result) {
            res.sendStatus(401)
            return
        }
        res
            .status(200)
            .json({accessToken: result})
        return
    },

    async getUserInfo(req: Request, res: Response) {
        // @ts-ignore
        const user = req.user
        res.status(200).json({
            email: user.email,
            login: user.login,
            userId: user._id
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

}
