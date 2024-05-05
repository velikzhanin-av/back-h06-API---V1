import {Request, Response} from "express";
import {deletePost} from "../../repositories/posts/postsMongoRepository";
import {deleteUser} from "../../services/users/userServices";

export const deleteUserById = async (req: Request, res: Response) => {
    const result = await deleteUser(req.params.id)
    if (!result) {
        res.sendStatus(404)
        return
    } else {res.sendStatus(204)}
}