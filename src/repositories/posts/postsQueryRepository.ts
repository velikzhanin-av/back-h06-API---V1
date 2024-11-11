import {CommentDbType, LikesDbType, PostDbType} from "../../types/dbTypes";
import {BlogsQueryRepository} from "../blogs/blogsQueryRepository";
import {PostsRepository} from "./postsRepository";
import {commentCollection, postCollection} from "../../db/mongoDb";
import {getTotalCount, helper} from "../utils";
import {CommentsRepository} from "../comments/commentsRepository";
import {injectable} from "inversify";

@injectable()
export class PostsQueryRepository {

    constructor(protected commentsRepository: CommentsRepository,
                protected postsRepository: PostsRepository,
                protected blogsQueryRepository: BlogsQueryRepository) {
    }

    async findAllPosts(query: any, userId: string | null) {
        const params: any = helper(query)
        const filter = this.blogsQueryRepository.searchNameTerm(params.searchNameTerm)
        let posts: PostDbType[] = await this.getPostsFromBD(params, filter)
        const totalCount: number = await getTotalCount(filter, 'post')
        const items: Array<any> = await Promise.all(posts.map(async post => {
            let like;
            if (userId) {
                like = await this.postsRepository.findLikeByPostIdAndUserId(post._id!.toString(), userId)
            }
            const newestLikes: Array<any> | undefined = await this.postsRepository.findNewestLikes(post._id!.toString())
            const likeStatus = like ? like.status : 'None';
            return this.mapToOutputPostsFromBd(post, likeStatus, newestLikes)
        }));
        return {
            pagesCount: Math.ceil(totalCount / params.pageSize),
            page: params.pageNumber,
            pageSize: params.pageSize,
            totalCount: totalCount,
            items
            // items: posts.map((post: PostDbType) => {
            //     return this.postsRepository.mapToOutputPosts(post)
            // })
        }
    }

    private async getPostsFromBD(params: any, filter: any) {
        // TODO насколько правильно сделано??? в документации этого нет
        const sort = {[params.sortBy]: params.sortDirection, _id: params.sortDirection}
        return await postCollection
            .find(filter)
            .sort(sort)
            .skip((params.pageNumber - 1) * params.pageSize)
            .limit(params.pageSize)
            .toArray() as any[] /*SomePostType[]*/
    }

    async findCommentsByPostId(query: any, id: string, userId: string | null) {
        const params: any = helper(query)
        const filter = {postId: id}
        let comments: any = await this.getCommentsFromBD(params, filter)
        const items: CommentDbType[] = await Promise.all( comments.map(async(comment: any) => {
                if (!userId) return this.postsRepository.mapToOutputComment(comment, "None")
                const like: LikesDbType | undefined | null = await this.commentsRepository.findLikeByUserId(comment._id.toString(), userId)
                if (!like) return this.postsRepository.mapToOutputComment(comment, "None")
                return this.postsRepository.mapToOutputComment(comment, like.status)
            })
        )

        const totalCount: number = await getTotalCount(filter, 'comment')
        return {
            pagesCount: Math.ceil(totalCount / params.pageSize),
            page: params.pageNumber,
            pageSize: params.pageSize,
            totalCount: totalCount,
            items
        }
    }

    private async getCommentsFromBD(params: any, filter: any) {
        const sort = {[params.sortBy]: params.sortDirection, _id: params.sortDirection}
        return await commentCollection
            .find(filter)
            .sort(sort)
            .skip((params.pageNumber - 1) * params.pageSize)
            .limit(params.pageSize)
            .toArray() as any[] /*SomePostType[]*/
    }

    mapToOutputPostsFromBd(post: any, likeStatus: string, newestLikes: Array<any> | undefined)  {
        return {
            id: post._id.toString(),
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








