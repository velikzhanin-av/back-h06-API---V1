import {CommentsRepository} from "../repositories/comments/commentsRepository";
import {findCommentsByPostId} from "../repositories/posts/postsQueryRepository";
import {findPostById} from "../repositories/posts/postsRepository";
import {postsServices} from "./postsServices";
import {WithId} from "mongodb";
import {CommentDbType, LikesDbType, likeStatus, UserDbType} from "../types/dbTypes";
import {StatusCodeHttp} from "../types/resultCode";
import {CommentsQueryRepository} from "../repositories/comments/commentsQueryRepository";

export class CommentsServices {

    static async findComments(query: any, id: string) {
        const result = await findPostById(id)
        if (!result) {
            return false
        }
        return await findCommentsByPostId(query, id)
    }

    static async createComment(postId: string, content: string, user: any) {
        const result = await findPostById(postId)
        if (!result) {
            return false
        }
        return await postsServices.createCommentByPostId(postId, content, user)
    }

    static async editComment(id: string, userId: string, content: string)  {
        const result = {
            isOwner: true,
            action: false
        }
        const comment = await CommentsQueryRepository.findCommentById(id)
        if (!comment) {
            return result
        }
        if (comment.commentatorInfo.userId !== userId) {
            result.isOwner = false
            return result
        }
        result.action = await CommentsRepository.editComment(id, content)
        return result
    }

    static async deleteComment(id: string, userId: string)  {
        const result = {
            isOwner: true,
            action: false
        }
        const comment = await CommentsQueryRepository.findCommentById(id)
        if (!comment) {
            return result
        }
        if (comment.commentatorInfo.userId !== userId) {
            result.isOwner = false
            return result
        }
        result.action = await CommentsRepository.deleteComment(id)
        return result
    }

    static async checkAction(userId: string, commentUserId: string) {
        return commentUserId === userId;

    }

    static async editCommentLikeStatus(commentId: string, user:UserDbType, status: likeStatus)  {
        const comment: WithId<CommentDbType> | undefined = await CommentsRepository.getCommentById(commentId)
        if (!comment) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }

        const findLike: LikesDbType | undefined | null = await CommentsRepository.findLikeByCommentAndUser(user._id!.toString(), commentId)
        if (!findLike) {
            if (status === likeStatus.Like) comment.likesCount.likesCount++
            else if (status === likeStatus.Dislike) comment.likesCount.dislikesCount++

            const newLike: LikesDbType = {
                createdAt: new Date().toISOString(),
                commentId,
                userId: user._id!.toString(),
                userLogin: user.login,
                status
            }

            const createLike = await CommentsRepository.createLike(newLike)

            let updateComment = await CommentsRepository.updateLikesCountComment(commentId,
                comment.likesCount.likesCount,
                comment.likesCount.dislikesCount)
        } else {
            if (findLike.status !== status) {
                switch (findLike.status) {

                    case likeStatus.Like:
                        switch (status) {
                            case likeStatus.Dislike:
                                comment.likesCount.likesCount--
                                comment.likesCount.dislikesCount++
                                break
                            case likeStatus.None:
                                comment.likesCount.likesCount--
                                break
                        }
                        break

                    case likeStatus.Dislike:
                        switch (status) {
                            case likeStatus.Like:
                                comment.likesCount.dislikesCount--
                                comment.likesCount.likesCount++
                                break
                            case likeStatus.None:
                                comment.likesCount.dislikesCount--
                                break
                        }
                        break

                    case likeStatus.None:
                        switch (status) {
                            case likeStatus.Like:
                                comment.likesCount.likesCount++
                                break
                            case likeStatus.Dislike:
                                comment.likesCount.dislikesCount++
                                break
                        }
                        break
                }
                findLike.status = status
                const updateLike = await CommentsRepository.updateLike(findLike._id!, status)
                const  updateComment = await CommentsRepository.updateLikesCountComment(commentId,
                    comment.likesCount.likesCount,
                    comment.likesCount.dislikesCount)
            }

        }

        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
    }



}