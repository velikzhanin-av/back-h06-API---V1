import {Request, Response} from "express"
import {findPostById} from "../../repositories/posts/postsMongoRepository";

export const getPostById = async (req: Request, res: Response) => {
    const post = await findPostById(req.params.id)
    if (!post) {
        res
            .sendStatus(404)
            return
    }
    res
        .status(200)
        .json(post)
}