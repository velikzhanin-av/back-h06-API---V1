import {findAllBlogs} from "../../repositories/blogs/blogsMongoQueryRepository";
import {Request, Response} from "express";

export const getAllBlogs = async (req: Request, res: Response) => {
    const db = await findAllBlogs(req.query)
    res
        .status(200)
        .json(db)
    return
}