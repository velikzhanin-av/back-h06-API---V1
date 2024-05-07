import {Request, Response} from "express";
import {findAllUsers} from "../repositories/users/usersQueryRepository";
import {createUser, deleteUser} from "../services/users/userServices";

type UsersOutType = {
    "pagesCount": number,
    "page": number,
    "pageSize": number,
    "totalCount": number,
    "items": any[]
}

export const usersController = {
    async getAllUsers(req: Request, res: Response) {
        const users: UsersOutType = await findAllUsers(req.query)
        res
            .status(200)
            .json(users)
        return
    },

    async postUser(req: Request, res: Response) {
        const result = await createUser(req.body)
        res
            .status(201)
            .json(result)

    },

    async deleteUserById(req: Request, res: Response) {
        const result = await deleteUser(req.params.id)
        if (!result) {
            res.sendStatus(404)
            return
        } else {res.sendStatus(204)}
    },
}