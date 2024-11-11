import {Request, Response} from "express";
import {BlogsQueryRepository} from "../repositories/blogs/blogsQueryRepository";
import {BlogsRepository} from "../repositories/blogs/blogsRepository";
import {injectable} from "inversify";
import {BlogsServices} from "../services/blogsServices";
import {RequestWithUser} from "../types/usersTypes";

@injectable()
export class BlogsController {

    constructor(protected blogsRepository: BlogsRepository,
                protected blogsQueryRepository: BlogsQueryRepository,
                protected blogsServices: BlogsServices) {
    }

    async getAllBlogs(req: Request, res: Response)  {
        const db = await this.blogsQueryRepository.findAllBlogs(req.query)
        res
            .status(200)
            .json(db)
        return
    }

    async getBlogById(req: Request, res: Response)  {
        const blog = await this.blogsRepository.findBlogById(req.params.id)
        if (!blog) {
            res
                .sendStatus(404)
            return
        }
        res
            .status(200)
            .json(blog)
    }

    async getPostsByBlogId(req: RequestWithUser, res: Response)  {
        const userId: string | null = req.user ? req.user._id.toString() : null
        const posts = await this.blogsQueryRepository.findPostsByBlogId(req.params.blogId, req.query, userId)
        if (!posts) {
            res
                .sendStatus(404)
            return
        }
        res
            .status(200)
            .json(posts)
    }

    async postBlog(req: Request, res: Response)  {
        const blogId = await this.blogsServices.createBlog(req.body)
        if (!blogId) {
            res.sendStatus(400)
            return
        }
        const result = await this.blogsQueryRepository.findBlogByIdQuery(blogId)
        if (!result) {
            res.sendStatus(400)
            return
        }

        res
            .status(201)
            .json(result)

    }

    async postedPostsByBlogId(req: Request, res: Response)  {
        const posts = await this.blogsRepository.createPostForBlogId(req.params.blogId, req.body)
        if (!posts) {
            res
                .sendStatus(404)
            return
        }
        res
            .status(201)
            .json(posts)
    }

    async updateBlogById(req: Request, res: Response)  {
        const result = await this.blogsServices.editBlog(req.params.id, req.body)
        if (!result) {
            res.sendStatus(404)
        } else {res.sendStatus(204)}
    }

    async deleteBlogById(req: Request, res: Response)  {
        const result = await this.blogsServices.deleteBlog(req.params.id)
        if (!result) {
            res.sendStatus(404)
        } else {res.sendStatus(204)}
    }


}