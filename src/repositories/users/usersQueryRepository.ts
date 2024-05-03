import {BlogDbType} from "../../db/dbTypes";
import {mapToOutputBlogs, searchNameTerm} from "../blogs/blogsMongoQueryRepository";
import {getTotalCount, helper} from "../utils";

export const findAllUsers = async (query: any) => {
    return {
        "pagesCount": 0,
        "page": 0,
        "pageSize": 0,
        "totalCount": 0,
        "items": [
            {
                "id": "string",
                "login": "string",
                "email": "string",
                "createdAt": "2024-05-03T10:45:30.047Z"
            }
        ]
    }
    // const params: any = helper(query)
    // const filter = searchNameTerm(params.searchNameTerm)
    // let users = await getBlogsFromBD(params, filter)
    // const totalCount: number = await getTotalCount(filter, 'user')
    // return {
    //     pagesCount: Math.ceil(totalCount / params.pageSize),
    //     page: params.pageNumber,
    //     pageSize: params.pageSize,
    //     totalCount: totalCount,
    //     items: blogs.map((blog: BlogDbType) => {
    //         return mapToOutputBlogs(blog)
    //     })
    // }
}