import {Request, Response} from "express"
import {login} from "../services/authServices";

export const postLogin = async (req: Request, res: Response) => {
    const result: boolean = await login(req.body)
    if (!result) {
        res.sendStatus(401)
        return
    }
    res.sendStatus(204)
    return
}