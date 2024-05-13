import {Request, Response} from "express"
import {authServices} from "../services/authServices";
import {jwtServices} from "../../utils/jwtServices";

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
}
