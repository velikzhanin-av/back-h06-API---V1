import {createCommentByPostId, UserInfoType} from "../repositories/posts/postsRepository";
import {CommentDbType} from "../types/dbTypes";


export const postsServices = {
    async createCommentByPostId (id: string, comment: string, user: UserInfoType) {
        const newComment: CommentDbType = {
            content: comment,
            commentatorInfo: {
                userId: user._id!.toString(),
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
            postId: id,
            likesCount: {
                likesCount: 0,
                dislikesCount: 0,
            }
        }
        return createCommentByPostId(newComment)
    }
}
