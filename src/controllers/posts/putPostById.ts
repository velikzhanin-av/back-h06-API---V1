import {Request, Response} from "express";
import {editPost} from "../../repositories/posts/postsMongoRepository";

export const putPostById = async (req: Request, res: Response) => {
    const result = await editPost(req.params.id, req.body)
    if (!result) {
        res.sendStatus(404)
    } else {res.sendStatus(204)}
}