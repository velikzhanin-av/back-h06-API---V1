import {blogsRepository} from "../repositories/blogs/blogsRepository";
import {commentsQueryRepository} from "../repositories/comments/commentsQueryRepository";
import {commentsRepository} from "../repositories/comments/commentsRepository";

export const commentsServices = {

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