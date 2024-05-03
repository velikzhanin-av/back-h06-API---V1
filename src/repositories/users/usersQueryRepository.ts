import {BlogDbType} from "../../db/dbTypes";
import {mapToOutputBlogs, searchNameTerm} from "../blogs/blogsMongoQueryRepository";
import {getTotalCount, helper} from "../utils";

export const findAllUsers = async (query: any) => {
    const params: any = helper(query)
    const filter = searchNameTerm(params.searchNameTerm)
    let blogs: BlogDbType[] = await getBlogsFromBD(params, filter)
    const totalCount: number = await getTotalCount(filter, 'user')
    return {
        pagesCount: Math.ceil(totalCount / params.pageSize),
        page: params.pageNumber,
        pageSize: params.pageSize,
        totalCount: totalCount,
        items: blogs.map((blog: BlogDbType) => {
            return mapToOutputBlogs(blog)
        })
    }
}