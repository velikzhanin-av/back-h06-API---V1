import {Request, Response} from "express";
import {editBlog} from "../../repositories/blogs/blogsMongoRepository";

export const updateBlogById = async (req: Request, res: Response) => {
    const result = await editBlog(req.params.id, req.body)
    if (!result) {
        res.sendStatus(404)
    } else {res.sendStatus(204)}
}