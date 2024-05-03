import {createBlog} from "../../repositories/blogs/blogsMongoRepository";
import {Request, Response} from "express";

export const postBlog = async (req: Request, res: Response) => {
    let result = await createBlog(req)
    res
        .status(201)
        .json(result)

}