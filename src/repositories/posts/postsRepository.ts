import {postCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {CommentDbType, PostDbType} from "../../types/dbTypes";
import {Request} from "express";
import {CommentsModel} from "../../models/commentsModel";
import {PostsModel} from "../../models/postsModel";

export type UserInfoType = {
    _id?: ObjectId
    login: string
    password: string
    email: string
    createdAt: string
    jwtToken: string
}

export class PostsRepository {

    mapToOutputPosts(post: PostDbType) {
        return {
            id: post._id?.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                dislikesCount: post.extendedLikesInfo.dislikesCount,
                likesCount: post.extendedLikesInfo.likesCount,
                myStatus: 'None',

            },
        }
    }

    mapToOutputComment(comment: any, likeStatus: string) { // TODO не работает с типизацией!!!
        return {
            id: comment._id?.toString(),
            content: comment.content,
            commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin
            },
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: comment.likesInfo.likesCount,
                dislikesCount: comment.likesInfo.dislikesCount,
                myStatus: likeStatus
            }
        }
    }

    mapToOutputPostComment(comment: any) { // TODO не работает с типизацией!!!
        return {
            id: comment._id?.toString(),
            content: comment.content,
            commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin
            },
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: comment.likesInfo.likesCount,
                dislikesCount: comment.likesInfo.dislikesCount,
                myStatus: 'None'
            }
        }
    }

    async createPost(newPost: PostDbType) {
        const result = await PostsModel.create(newPost)
        return this.mapToOutputPosts(result)
    }

    async findPostById(id: string) {
        try {
            const post = await PostsModel.findOne({_id: new ObjectId(id)})
            if (!post) return
            return this.mapToOutputPosts(post)
        } catch (err) {
            return false
        }
    }

    async editPost(id: string, body: any) {
        try {
            const res = await PostsModel.updateOne({_id: new ObjectId(id)}, {
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

    async deletePost(id: string) {
        try {
            const res = await PostsModel.deleteOne({_id: new ObjectId(id)})
            return res.deletedCount !== 0
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async createCommentByPostId(newComment: CommentDbType) {
        try {
            const res = await CommentsModel.create(newComment)
            return this.mapToOutputPostComment(res)
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

















