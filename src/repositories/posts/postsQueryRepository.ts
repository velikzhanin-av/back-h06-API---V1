import {BlogDbType, PostDbType} from "../../db/dbTypes";
import {
    mapToOutputBlogs,
    searchNameTerm
} from "../blogs/blogsQueryRepository";
import {mapToOutputComment, mapToOutputPosts} from "./postsRepository";
import {blogCollection, commentCollection, postCollection} from "../../db/mongoDb";
import {getTotalCount, helper} from "../utils";

export const findAllPosts = async (query: any) => {
    const params: any = helper(query)
    const filter = searchNameTerm(params.searchNameTerm)
    let posts: PostDbType[] = await getPostsFromBD(params, filter)
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

const getPostsFromBD = async (params: any, filter: any) => {
    // TODO насколько правильно сделано??? в документации этого нет
    const sort = {[params.sortBy]: params.sortDirection, _id: params.sortDirection}
    return await postCollection
        .find(filter)
        .sort(sort)
        .skip((params.pageNumber - 1) * params.pageSize)
        .limit(params.pageSize)
        .toArray() as any[] /*SomePostType[]*/
}

export const findCommentsByPostId = async (query: any) => {
    const params: any = helper(query)
    const filter = searchNameTerm(params.searchNameTerm)
    let comments: PostDbType[] = await getCommentsFromBD(params, filter)
    const totalCount: number = await getTotalCount(filter, 'comment')
    return {
        pagesCount: Math.ceil(totalCount / params.pageSize),
        page: params.pageNumber,
        pageSize: params.pageSize,
        totalCount: totalCount,
        items: comments.map((comment: any) => {
            return mapToOutputComment(comment)
        })
    }
}


const getCommentsFromBD = async (params: any, filter: any) => {
    // TODO насколько правильно сделано??? в документации этого нет
    const sort = {[params.sortBy]: params.sortDirection, _id: params.sortDirection}
    return await commentCollection
        .find(filter)
        .sort(sort)
        .skip((params.pageNumber - 1) * params.pageSize)
        .limit(params.pageSize)
        .toArray() as any[] /*SomePostType[]*/
}
