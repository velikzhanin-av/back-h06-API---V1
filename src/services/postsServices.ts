import {createCommentByPostId, UserInfoType} from "../repositories/posts/postsRepository";


export const postsServices = {
    async createCommentByPostId (id: string, comment: string, user: UserInfoType) {
        return createCommentByPostId(id, comment, user)
    }
}
