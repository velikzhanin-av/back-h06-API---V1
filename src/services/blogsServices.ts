import {BlogDbType} from "../db/dbTypes";
import {blogsRepository} from "../repositories/blogs/blogsRepository";
import {mapToOutputBlogs} from "../repositories/blogs/blogsQueryRepository";

export const blogsServices = {
    async createBlog(body: any) {
        const newBlog: BlogDbType = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return await blogsRepository.createBlog(newBlog)
    },


}