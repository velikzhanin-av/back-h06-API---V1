import {Request, Response} from "express";
import {findAllPosts} from "../../repositories/posts/postsMongoQueryRepository";


export const getAllPosts = async (req: Request, res: Response) => {
    const db = await findAllPosts(req.query)
    res
        .status(200)
        .json(db)
}