import {CommentDbType, LikesDbType, PostDbType} from "../../types/dbTypes";
import {
    searchNameTerm
} from "../blogs/blogsQueryRepository";
import {mapToOutputComment, mapToOutputPosts} from "./postsRepository";
import {commentCollection, postCollection} from "../../db/mongoDb";
import {getTotalCount, helper} from "../utils";
import {CommentsRepository} from "../comments/commentsRepository";
import {injectable} from "inversify";

@injectable()
export class PostsQueryRepository {

    constructor(protected commentsRepository: CommentsRepository) {
    }

    async findAllPosts(query: any) {
        const params: any = helper(query)
        const filter = searchNameTerm(params.searchNameTerm)
        let posts: PostDbType[] = await this.getPostsFromBD(params, filter)
        const totalCount: number = await getTotalCount(filter, 'post')
        return {
            pagesCount: Math.ceil(totalCount / params.pageSize),
            page: params.pageNumber,
            pageSize: params.pageSize,
            totalCount: totalCount,
            items: posts.map((post: PostDbType) => {
                return mapToOutputPosts(post)
            })
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
                if (!userId) return mapToOutputComment(comment, "None")
                const like: LikesDbType | undefined | null = await this.commentsRepository.findLikeByUserId(comment._id.toString(), userId)
                if (!like) return mapToOutputComment(comment, "None")
                return mapToOutputComment(comment, like.status)
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
}








