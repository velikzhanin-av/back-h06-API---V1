import {BlogDbType, PostDbType} from "../../db/dbTypes";
import {
    getTotalCount,
    getTotalCountPosts,
    helper,
    mapToOutputBlogs,
    searchNameTerm
} from "../blogs/blogsMongoQueryRepository";
import {mapToOutputPosts} from "./postsMongoRepository";
import {blogCollection, postCollection} from "../../db/mongoDb";

export const findAllPosts = async (query: any) => {
    const params: any = helper(query)
    const filter = searchNameTerm(params.searchNameTerm)
    let posts: PostDbType[] = await getPostsFromBD(params, filter)
    const totalCount: number = await getTotalCountPosts(filter)
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
    console.log(`${params.sortBy} ${params.sortDirection}`)
    return await postCollection
        .find(filter)
        .sort(params.sortBy, params.sortDirection)
        .skip((params.pageNumber - 1) * params.pageSize)
        .limit(params.pageSize)
        .toArray() as any[] /*SomePostType[]*/
}