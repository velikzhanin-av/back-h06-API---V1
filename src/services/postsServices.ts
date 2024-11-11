import {
    CommentDbType,
    LikesCount,
    LikesDbType,
    likeStatus,
    PostDbType,
    PostsLikesDbType,
    UserDbType
} from "../types/dbTypes";
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

    async editPostLikeStatus(postId: string, user: UserDbType, status: likeStatus)  {
        const post: PostDbType | undefined = await this.postsRepository.findPostById(postId)
        if (!post) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }

        const findLike: PostsLikesDbType | undefined | null = await this.postsRepository.findLikeByPostAndUser(user._id!.toString(), postId)
        if (!findLike) {
            if (status === likeStatus.Like) post.extendedLikesInfo.likesCount++
            else if (status === likeStatus.Dislike) post.extendedLikesInfo.dislikesCount++

            const newLike: PostsLikesDbType = {
                addedAt: new Date().toISOString(),
                postId,
                userId: user._id!.toString(),
                login: user.login,
                status,
            }

            const createLike = await this.postsRepository.createLike(newLike)

            let updatePost = await this.postsRepository.updateLikesCountComment(postId,
                post.extendedLikesInfo.likesCount,
                post.extendedLikesInfo.dislikesCount)
        } else {
            if (findLike.status !== status) {
                switch (findLike.status) {

                    case likeStatus.Like:
                        switch (status) {
                            case likeStatus.Dislike:
                                post.extendedLikesInfo.likesCount--
                                post.extendedLikesInfo.dislikesCount++
                                break
                            case likeStatus.None:
                                post.extendedLikesInfo.likesCount = 0
                                post.extendedLikesInfo.dislikesCount = 0
                                break
                        }
                        break

                    case likeStatus.Dislike:
                        switch (status) {
                            case likeStatus.Like:
                                post.extendedLikesInfo.dislikesCount--
                                post.extendedLikesInfo.likesCount++
                                break
                            case likeStatus.None:
                                post.extendedLikesInfo.likesCount = 0
                                post.extendedLikesInfo.dislikesCount = 0
                                break
                        }
                        break

                    case likeStatus.None:
                        switch (status) {
                            case likeStatus.Like:
                                post.extendedLikesInfo.likesCount++
                                break
                            case likeStatus.Dislike:
                                post.extendedLikesInfo.dislikesCount++
                                break
                        }
                        break
                }
                findLike.status = status
                const updateLike = await this.postsRepository.updateLike(findLike._id!, status)
                const updateComment = await this.postsRepository.updateLikesCountComment(postId,
                    post.extendedLikesInfo.likesCount,
                    post.extendedLikesInfo.dislikesCount)
            }

        }

        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
    }

    async findPostById(postId: string, userId: string | null) {
        const post: PostDbType | undefined = await this.postsRepository.findPostById(postId)
        if (!post) return {
            statusCode: StatusCodeHttp.NotFound,
            data: null
        }

        const newestLikes: Array<any> | undefined = await this.postsRepository.findNewestLikes(postId)
        // TODO поправить any
        let postOut: any = this.mapToOutputPostsFromBd(post, 'None', newestLikes)

        if (!userId) return {
            statusCode: StatusCodeHttp.Ok,
            data: postOut
        }

        const like: PostsLikesDbType | undefined | null = await this.postsRepository.findLikeByPostIdAndUserId(postId, userId)
        if (!like) return {
            statusCode: StatusCodeHttp.Ok,
            data: postOut
        }

        postOut = this.mapToOutputPostsFromBd(post, like.status, newestLikes)

        return {
            statusCode: StatusCodeHttp.Ok,
            data: postOut
        }
    }

    mapToOutputPostsFromBd(post: any, likeStatus: string, newestLikes: Array<any> | undefined)  {
        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                dislikesCount: post.extendedLikesInfo.dislikesCount,
                likesCount: post.extendedLikesInfo.likesCount,
                myStatus: likeStatus,
                newestLikes
            },
        }
    }

}
