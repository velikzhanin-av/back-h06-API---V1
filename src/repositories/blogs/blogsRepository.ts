import {blogCollection, postCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {BlogsQueryRepository} from "./blogsQueryRepository";
import {PostsRepository} from "../posts/postsRepository";
import {BlogModel} from "../../models/blogsModel";
import {injectable} from "inversify";
import {PostsModel} from "../../models/postsModel";

@injectable()
export class BlogsRepository {

    constructor(protected postsRepository: PostsRepository,
                protected blogsQueryRepository: BlogsQueryRepository) {
    }

    async createBlog(newBlog: any) {
        const result = await BlogModel.create(newBlog)
        return result._id.toString()
    }

    async editBlog(id: string, body: any) {
        try {
            const res = await blogCollection.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    name: body.name,
                    description: body.description,
                    websiteUrl: body.websiteUrl
                }
            })
            return res.matchedCount !== 0
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async deleteBlog(id: string)  {
        try {
            const res = await blogCollection.deleteOne({_id: new ObjectId(id)})
            return res.deletedCount !== 0
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async findBlogById(id: string) {
        try {
            const blog = await blogCollection.findOne({_id: new ObjectId(id)})
            return this.blogsQueryRepository.mapToOutputBlogs(blog)
        } catch (err) {
            return false
        }
    }

    async createPostForBlogId(blogId: string, body: any) {
        const findBlog = await this.findBlogById(blogId)
        if (!findBlog) {
            return
        }
        const newPost: any = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: blogId,
            blogName: findBlog.name,
            createdAt: new Date().toISOString(),
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
            }
        }
        const result = await PostsModel.create(newPost)
        return this.postsRepository.mapToOutputPosts(result)
    }

}













