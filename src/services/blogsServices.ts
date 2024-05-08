import {BlogDbType} from "../db/dbTypes";
import {blogsRepository} from "../repositories/blogs/blogsRepository";


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

    async editBlog(id: string, body: any) {
        return await blogsRepository.editBlog(id, body)
    },

    async deleteBlog(id: string)  {
        return await blogsRepository.deleteBlog(id)
    },


}