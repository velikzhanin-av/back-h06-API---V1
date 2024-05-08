import {blogCollection, postCollection} from "../../db/mongoDb";
import {Request} from "express";
import {ObjectId} from "mongodb";
import {BlogDbType} from "../../db/dbTypes";
import {mapToOutputBlogs} from "./blogsQueryRepository";
import {mapToOutputPosts} from "../posts/postsRepository";


export const blogsRepository = {
    async createBlog(newBlog: any) {
        const result = await blogCollection.insertOne(newBlog)
        return mapToOutputBlogs(newBlog)
    },

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
}









export const findBlogById = async (id: string) => {
    try {
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        return mapToOutputBlogs(blog)
    } catch (err) {
        return false
    }
}

export const deleteBlog = async (id: string) => {
    try {
        const res = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount !== 0
    } catch (err) {
        console.log(err)
        return false
    }
}

export const createPostForBlogId = async (blogId: string, body: any) => {
    const findBlog = await findBlogById(blogId)
    if (!findBlog) {
        return
    }
    const newPost: any = {
        title: body.title,
        shortDescription: body.shortDescription,
        content: body.content,
        blogId: blogId,
        blogName: findBlog.name,
        createdAt: new Date().toISOString()
    }
    let result = await postCollection.insertOne(newPost)
    return mapToOutputPosts(newPost)
}
