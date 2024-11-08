import {CommentDbType, LikesDbType, likeStatus, PostDbType, UserDbType} from "../types/dbTypes";
import {PostsRepository, UserInfoType} from "../repositories/posts/postsRepository";
import {injectable} from "inversify";
import {StatusCodeHttp} from "../types/resultCode";
import {WithId} from "mongodb";

@injectable()
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
        const result = await this.postsRepository.createPost(newPost)
        return {
            statusCode: StatusCodeHttp.Created,
            data: result
        }
    }

    async editPostLikeStatus(postId: string, user:UserDbType, status: likeStatus)  {
        const post: WithId<PostDbType> | undefined = await this.postsRepository.findPostById(postId)
        if (!comment) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }

        const findLike: LikesDbType | undefined | null = await this.commentsRepository.findLikeByCommentAndUser(user._id!.toString(), postId)
        if (!findLike) {
            if (status === likeStatus.Like) comment.likesInfo.likesCount++
            else if (status === likeStatus.Dislike) comment.likesInfo.dislikesCount++

            const newLike: LikesDbType = {
                createdAt: new Date().toISOString(),
                postId,
                userId: user._id!.toString(),
                userLogin: user.login,
                status
            }

            const createLike = await this.commentsRepository.createLike(newLike)

            let updateComment = await this.commentsRepository.updateLikesCountComment(postId,
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
                const updateLike = await this.commentsRepository.updateLike(findLike._id!, status)
                const updateComment = await this.commentsRepository.updateLikesCountComment(postId,
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
