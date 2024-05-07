import {Request, Response} from "express"
import {authServices} from "../services/authServices";

export const authController = {
    async postLogin(req: Request, res: Response) {
        const result = await authServices.login(req.body)
        if (!result) {
            res.sendStatus(401)
            return
        }
        res.sendStatus(204)
        return
    }
}
