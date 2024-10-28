import {CommentsRepository} from "../repositories/comments/commentsRepository";
import {findCommentsByPostId} from "../repositories/posts/postsQueryRepository";
import {findPostById} from "../repositories/posts/postsRepository";
import {postsServices} from "./postsServices";
import {WithId} from "mongodb";
import {CommentDbType, LikesDbType, likeStatus, UserDbType} from "../types/dbTypes";
import {StatusCodeHttp} from "../types/resultCode";
import {CommentsQueryRepository} from "../repositories/comments/commentsQueryRepository";

export class CommentsServices {


    async findComments(query: any, id: string, userId: string | null) {

        const post = await findPostById(id)
        if (!post) {
            return {
                statusCode: StatusCodeHttp.NotFound,
                data: null
            }
        }

        const result = await findCommentsByPostId(query, id, userId)
        if (!result.items) {
            return {
                statusCode: StatusCodeHttp.NotFound,
                data: null
            }
        }

        return {
            statusCode: StatusCodeHttp.Ok,
            data: result
        }
    }

    async createComment(postId: string, content: string, user: any) {
        const result = await findPostById(postId)
        if (!result) {
            return false
        }
        return await postsServices.createCommentByPostId(postId, content, user)
    }

    async findCommentById(commentId: string, userId: string | null) {
        const comment: WithId<CommentDbType> | undefined = await CommentsRepository.getCommentById(commentId)
        if (!comment) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }
        // TODO поправить any
        let commentOut: any = this.mapToUserViewComment(comment, 'None')

        if (!userId) return {
            statusCode: StatusCodeHttp.Ok,
            data: commentOut
        }

        const like: LikesDbType | undefined | null = await CommentsRepository.findLikeByUserId(commentId, userId)
        if (!like) return {
            statusCode: StatusCodeHttp.Ok,
            data: commentOut
        }

        commentOut = this.mapToUserViewComment(comment, like.status)

        return {
            statusCode: StatusCodeHttp.Ok,
            data: commentOut
        }
    }

    mapToUserViewComment(comment: CommentDbType, likeStatus: string ) { //
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

    async editComment(id: string, userId: string, content: string)  {
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

    async deleteComment(id: string, userId: string)  {
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

    async editCommentLikeStatus(commentId: string, user:UserDbType, status: likeStatus)  {
        const comment: WithId<CommentDbType> | undefined = await CommentsRepository.getCommentById(commentId)
        if (!comment) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }

        const findLike: LikesDbType | undefined | null = await CommentsRepository.findLikeByCommentAndUser(user._id!.toString(), commentId)
        if (!findLike) {
            if (status === likeStatus.Like) comment.likesInfo.likesCount++
            else if (status === likeStatus.Dislike) comment.likesInfo.dislikesCount++

            const newLike: LikesDbType = {
                createdAt: new Date().toISOString(),
                commentId,
                userId: user._id!.toString(),
                userLogin: user.login,
                status
            }

            const createLike = await CommentsRepository.createLike(newLike)

            let updateComment = await CommentsRepository.updateLikesCountComment(commentId,
                comment.likesInfo.likesCount,
                comment.likesInfo.dislikesCount)
        } else {
            if (findLike.status !== status) {
                switch (findLike.status) {

                    case likeStatus.Like:
                        switch (status) {
                            case likeStatus.Dislike:
                                comment.likesInfo.likesCount--
                                comment.likesInfo.dislikesCount++
                                break
                            case likeStatus.None:
                                comment.likesInfo.likesCount = 0
                                comment.likesInfo.dislikesCount = 0
                                break
                        }
                        break

                    case likeStatus.Dislike:
                        switch (status) {
                            case likeStatus.Like:
                                comment.likesInfo.dislikesCount--
                                comment.likesInfo.likesCount++
                                break
                            case likeStatus.None:
                                comment.likesInfo.likesCount = 0
                                comment.likesInfo.dislikesCount = 0
                                break
                        }
                        break

                    case likeStatus.None:
                        switch (status) {
                            case likeStatus.Like:
                                comment.likesInfo.likesCount++
                                break
                            case likeStatus.Dislike:
                                comment.likesInfo.dislikesCount++
                                break
                        }
                        break
                }
                findLike.status = status
                const updateLike = await CommentsRepository.updateLike(findLike._id!, status)
                const updateComment = await CommentsRepository.updateLikesCountComment(commentId,
                    comment.likesInfo.likesCount,
                    comment.likesInfo.dislikesCount)
            }

        }

        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
    }

}