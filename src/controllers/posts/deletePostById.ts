import {Request, Response} from "express";
import {deletePost} from "../../repositories/posts/postsMongoRepository";

export const deletePostById = async (req: Request, res: Response) => {
    const result = await deletePost(req.params.id)
    if (!result) {
        res.sendStatus(404)
        return
    } else {res.sendStatus(204)}
}