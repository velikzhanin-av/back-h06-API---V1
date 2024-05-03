import {Request, Response} from "express"
import {findBlogById} from "../../repositories/blogs/blogsMongoRepository";

export const getBlogById = async (req: Request, res: Response) => {
    const blog = await findBlogById(req.params.id)
    if (!blog) {
        res
            .sendStatus(404)
        return
    }
    res
        .status(200)
        .json(blog)
}