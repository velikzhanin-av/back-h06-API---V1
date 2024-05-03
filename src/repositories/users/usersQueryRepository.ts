import {BlogDbType, UserDbType} from "../../db/dbTypes";
import {mapToOutputBlogs, searchNameTerm} from "../blogs/blogsMongoQueryRepository";
import {getFromBD, getTotalCount, helper} from "../utils";


export const mapToOutputUsers = (user: any) => {
    return {
        id: user._id.toString(),
        name: user.name,
        description: user.description,
        websiteUrl: user.websiteUrl,
        createdAt: user.createdAt,
        isMembership: user.isMembership
    }
}

export const findAllUsers = async (query: any) => {
    const params: any = helper(query)
    const filter = searchNameTerm(params.searchNameTerm)
    let users = await getFromBD(params, filter, 'user')
    const totalCount: number = await getTotalCount(filter, 'user')
    return {
        pagesCount: Math.ceil(totalCount / params.pageSize),
        page: params.pageNumber,
        pageSize: params.pageSize,
        totalCount: totalCount,
        items: users.map((user: UserDbType) => {
            return mapToOutputUsers(user)
        })
    }
}


// return {
//     "pagesCount": 0,
//     "page": 0,
//     "pageSize": 0,
//     "totalCount": 0,
//     "items": [
//         {
//             "id": "string",
//             "login": "string",
//             "email": "string",
//             "createdAt": "2024-05-03T10:45:30.047Z"
//         }
//     ]
// }