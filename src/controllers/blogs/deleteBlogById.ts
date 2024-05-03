import {Request, Response} from "express";
import {deleteBlog} from "../../repositories/blogs/blogsMongoRepository";

export const deleteBlogById = async (req: Request, res: Response) => {
    const result = await deleteBlog(req.params.id)
    if (!result) {
        res.sendStatus(404)
    } else {res.sendStatus(204)}
}