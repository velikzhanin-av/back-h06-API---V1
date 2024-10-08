import {Request, Response} from "express";
import {findAllBlogs, findBlogByIdQuery, findPostsByBlogId} from "../repositories/blogs/blogsQueryRepository";
import {
    createPostForBlogId,
    findBlogById
} from "../repositories/blogs/blogsRepository";
import {blogsServices} from "../services/blogsServices";

export const blogsController = {
    async getAllBlogs(req: Request, res: Response)  {
        const db = await findAllBlogs(req.query)
        res
            .status(200)
            .json(db)
        return
    },

    async getBlogById(req: Request, res: Response)  {
        const blog = await findBlogById(req.params.id)
        if (!blog) {
            res
                .sendStatus(404)
            return
        }
        res
            .status(200)
            .json(blog)
    },

    async getPostsByBlogId(req: Request, res: Response)  {
        const posts = await findPostsByBlogId(req.params.blogId, req.query)
        if (!posts) {
            res
                .sendStatus(404)
            return
        }
        res
            .status(200)
            .json(posts)
    },

    async postBlog(req: Request, res: Response)  {
        const blogId = await blogsServices.createBlog(req.body)
        if (!blogId) {
            res.sendStatus(400)
            return
        }
        const result = await findBlogByIdQuery(blogId)
        if (!result) {
            res.sendStatus(400)
            return
        }

        res
            .status(201)
            .json(result)

    },

    async postedPostsByBlogId(req: Request, res: Response)  {
        const posts = await createPostForBlogId(req.params.blogId, req.body)
        if (!posts) {
            res
                .sendStatus(404)
            return
        }
        res
            .status(201)
            .json(posts)
    },

    async updateBlogById(req: Request, res: Response)  {
        const result = await blogsServices.editBlog(req.params.id, req.body)
        if (!result) {
            res.sendStatus(404)
        } else {res.sendStatus(204)}
    },

    async deleteBlogById(req: Request, res: Response)  {
        const result = await blogsServices.deleteBlog(req.params.id)
        if (!result) {
            res.sendStatus(404)
        } else {res.sendStatus(204)}
    },


}