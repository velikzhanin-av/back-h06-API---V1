import {commentCollection, postCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {CommentDbType, PostDbType} from "../../types/dbTypes";
import {db} from "../../db/db";
import {Request} from "express";

export type UserInfoType = {
    _id?: ObjectId
    login: string
    password: string
    email: string
    createdAt: string
    jwtToken: string
}

export const mapToOutputPosts = (post: any) => { // TODO не работает с типизацией!!!
    return {
        id: post._id?.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}

export const mapToOutputComment = (comment: any) => { // TODO не работает с типизацией!!!
    return {
        id: comment._id?.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt,
    }
}

export const createPost = async (req: Request) => {
    const newPost =
        {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: "string",
            createdAt: new Date().toISOString()
        }
    let result = await postCollection.insertOne(newPost)
    // TODO проверить позже изменение переменной
    return mapToOutputPosts(newPost)
}

export const findPostById = async (id: string) => {
    try {
        const post = await postCollection.findOne({_id: new ObjectId(id)})
        return mapToOutputPosts(post)
    } catch (err) {
        return false
    }
}

export const editPost = async (id: string, body: any) => {
    try {
        const res = await postCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId
            }
        })
        return res.matchedCount !== 0
    } catch (err) {
        console.log(err)
        return false
    }
}

export const deletePost = async (id: string) => {
    try {
        const res = await postCollection.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount !== 0
    } catch (err) {
        console.log(err)
        return false
    }
}

export const createCommentByPostId = async (newComment: CommentDbType) => {
    try {
        const res = await commentCollection.insertOne(newComment)
        return mapToOutputComment(newComment)
    } catch (err) {
        console.log(err)
        return false
    }
}

