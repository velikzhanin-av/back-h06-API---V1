import {postCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {CommentDbType, LikesDbType, PostDbType, PostsLikesDbType} from "../../types/dbTypes";
import {Request} from "express";
import {CommentsModel} from "../../models/commentsModel";
import {PostsModel} from "../../models/postsModel";
import {injectable} from "inversify";
import Any = jasmine.Any;
import {LikesModel} from "../../models/likesModel";
import {PostsLikesModel} from "../../models/postsLikesModel";

export type UserInfoType = {
    _id?: ObjectId
    login: string
    password: string
    email: string
    createdAt: string
    jwtToken: string
}

@injectable()
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
                newestLikes: []
            },
        }
    }

    mapToOutputNewestLikes(like: PostsLikesDbType) {
        return {
            addedAt: like.addedAt,
            userId: like.userId,
            login: like.login
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
            return
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

    async findLikeByPostAndUser(userId: string, postId: string) {
        try {
            return await PostsLikesModel.findOne({userId, postId})
        } catch (e) {
            console.log(e)
            return
        }
    }

    async createLike(newLike: PostsLikesDbType) {
        try {
            return await PostsLikesModel.create(newLike)
        } catch (e) {
            console.log(e)
            return
        }
    }

    async updateLikesCountComment(postId: string, likesCount: number, dislikesCount: number) {
        try {
            return await PostsModel.updateOne({_id: new ObjectId(postId)}, {
                $set: {
                    "extendedLikesInfo.likesCount": likesCount,
                    "extendedLikesInfo.dislikesCount": dislikesCount,
                }
            })
        } catch (e) {
            console.log(e)
            return
        }
    }

    async updateLike(_id: ObjectId, status: string) {
        try {
            return await PostsLikesModel.updateOne({_id}, {status})
        } catch (e) {
            console.log(e)
            return
        }
    }

    async findNewestLikes(postId: string) {
        try {
            const result = await PostsLikesModel.find({ postId, status: 'Like' })
                .sort({ addedAt: -1 })
                .limit(3)
            return result.map((like: PostsLikesDbType) => {
                return this.mapToOutputNewestLikes(like)
            })
        } catch (e) {
            console.log(e)
            return
        }
    }

    async findLikeByPostIdAndUserId(postId: string, userId: string) {
        try {
            return await PostsLikesModel.findOne({postId, userId})
        } catch (e) {
            console.log(e)
            return
        }
    }
}

















