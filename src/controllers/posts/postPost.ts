import {createPost} from "../../repositories/posts/postsMongoRepository";
import {Request, Response} from "express";

export const postPost = async (req: Request, res: Response) => {
    const newPost = await createPost(req)
    res
        .status(201)
        .json(newPost)
}