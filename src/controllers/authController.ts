import {Request, Response} from "express"
import {authServices} from "../services/authServices";

export const authController = {
    async postLogin(req: Request, res: Response) {
        const result = await authServices.login(req.body)
        if (!result) {
            res.sendStatus(401)
            return
            console.log()
        }
        console.log('result: ' + result)
        res
            .status(200)
            .json({accessToken: result})
        return
    },
}
