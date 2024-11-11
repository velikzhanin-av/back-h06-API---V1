import {BlogDbType} from "../types/dbTypes";
import {BlogsRepository} from "../repositories/blogs/blogsRepository";
import {injectable} from "inversify";

@injectable()
export class BlogsServices {

    constructor(protected blogsRepository: BlogsRepository) {
    }

    async createBlog(body: any) {
        const newBlog: BlogDbType = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return await this.blogsRepository.createBlog(newBlog)
    }

    async editBlog(id: string, body: any) {
        return await this.blogsRepository.editBlog(id, body)
    }

    async deleteBlog(id: string)  {
        return await this.blogsRepository.deleteBlog(id)
    }

}