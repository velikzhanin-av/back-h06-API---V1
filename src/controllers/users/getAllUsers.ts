import {Request, Response} from "express";
import {findAllUsers} from "../../repositories/users/usersQueryRepository";

type UsersOutType = {
    "pagesCount": number,
    "page": number,
    "pageSize": number,
    "totalCount": number,
    "items": any[]
}

export const getAllUsers = async (req: Request, res: Response) => {
    const users: UsersOutType = await findAllUsers(req.query)
    res
        .status(200)
        .json(users)
    return
}