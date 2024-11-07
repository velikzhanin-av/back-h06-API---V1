import {CommentDbType} from "../types/dbTypes";
import {PostsRepository, UserInfoType} from "../repositories/posts/postsRepository";


export class PostsServices {

    constructor(protected postsRepository: PostsRepository) {
    }

    async createCommentByPostId (id: string, comment: string, user: UserInfoType) {
        const newComment: CommentDbType = {
            content: comment,
            commentatorInfo: {
                userId: user._id!.toString(),
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
            postId: id,
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
            }
        }
        return this.postsRepository.createCommentByPostId(newComment)
    }

    async createPost(post: any) {
        const newPost =
            {
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: "string",
                createdAt: new Date().toISOString(),
                extendedLikesInfo: {
                    likesCount: 0,
                    dislikesCount: 0,
                }

            }
        const result = await this.postsRepository.createPost
    }

}
