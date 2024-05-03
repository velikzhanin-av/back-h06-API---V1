import {Request, Response} from "express"
import {findPostsByBlogId} from "../../repositories/blogs/blogsMongoQueryRepository";
import {createPostForBlogId} from "../../repositories/blogs/blogsMongoRepository";

export const postedPostsByBlogId = async (req: Request, res: Response) => {
    const posts = await createPostForBlogId(req.params.blogId, req.body)
    if (!posts) {
        res
            .sendStatus(404)
        return
    }
    res
        .status(201)
        .json(posts)
}