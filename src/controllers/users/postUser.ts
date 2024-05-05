import {Request, Response} from "express";
import {createUser} from "../../services/users/userServices";

export const postUser = async (req: Request, res: Response) => {
    const result = await createUser(req.body)
    res
        .status(201)
        .json(result)

}