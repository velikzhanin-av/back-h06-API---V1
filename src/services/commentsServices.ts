import {blogsRepository} from "../repositories/blogs/blogsRepository";
import {commentsQueryRepository} from "../repositories/comments/commentsQueryRepository";
import {commentsRepository} from "../repositories/comments/commentsRepository";
import {findCommentsByPostId} from "../repositories/posts/postsQueryRepository";
import {postCollection} from "../db/mongoDb";
import {findPostById} from "../repositories/posts/postsRepository";
import {postsServices} from "./postsServices";
import {WithId} from "mongodb";
import {CommentDbType} from "../types/dbTypes";
import {STATUS_CODES} from "http";
import {StatusCodeHttp} from "../types/resultCode";

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
        const comment = await commentsQueryRepository.findCommentById(id)
        if (!comment) {
            return result
        }
        if (comment.commentatorInfo.userId !== userId) {
            result.isOwner = false
            return result
        }
        result.action = await commentsRepository.editComment(id, content)
        return result
    }

    static async deleteComment(id: string, userId: string)  {
        const result = {
            isOwner: true,
            action: false
        }
        const comment = await commentsQueryRepository.findCommentById(id)
        if (!comment) {
            return result
        }
        if (comment.commentatorInfo.userId !== userId) {
            result.isOwner = false
            return result
        }
        result.action = await commentsRepository.deleteComment(id)
        return result
    }

    static async checkAction(userId: string, commentUserId: string) {
        return commentUserId === userId;

    }

    static async editCommentLikeStatus(commentId: string, status: string)  {
        const comment: WithId<CommentDbType> | undefined = await commentsRepository.getCommentById(commentId)
        if (!comment) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }

        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
    }


}