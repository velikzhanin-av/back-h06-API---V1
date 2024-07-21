import {Request, Response} from "express"
import {authServices} from "../services/authServices";
import {findUserInfo} from "../repositories/users/usersQueryRepository";

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
        console.log(req.headers['authorization'])
        res.sendStatus(200)
        return false
        // const result = await findUserInfo()
}
}
