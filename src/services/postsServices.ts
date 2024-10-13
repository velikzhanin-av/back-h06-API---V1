import {createCommentByPostId, UserInfoType} from "../repositories/posts/postsRepository";


export const postsServices = {
    async createCommentByPostId (id: string, comment: string, user: UserInfoType) {
        const newComment: any = {
            content: comment,
            commentatorInfo: {
                userId: user._id?.toString(),
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
            postId: id,
        }
        return createCommentByPostId(newComment)
    }
}
