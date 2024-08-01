import {blogsRepository} from "../repositories/blogs/blogsRepository";
import {commentsQueryRepository} from "../repositories/comments/commentsQueryRepository";
import {commentsRepository} from "../repositories/comments/commentsRepository";
import {findCommentsByPostId} from "../repositories/posts/postsQueryRepository";
import {postCollection} from "../db/mongoDb";
import {findPostById} from "../repositories/posts/postsRepository";
import {postsServices} from "./postsServices";

export const commentsServices = {

    async findComments(query: any, id: string) {
        const result = await findPostById(id)
        if (!result) {
            return false
        }
        return await findCommentsByPostId(query, id)
    },

    async createComment(postId: string, content: string, user: any) {
        const result = await findPostById(postId)
        if (!result) {
            return false
        }
        return await postsServices.createCommentByPostId(postId, content, user)
    },

    async editComment(id: string, userId: string, content: string)  {
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
    },

    async deleteComment(id: string, userId: string)  {
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
    },

    async checkAction(userId: string, commentUserId: string) {
        return commentUserId === userId;

    }


}