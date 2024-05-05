import {BlogDbType, UserDbType} from "../../db/dbTypes";
import {mapToOutputBlogs, searchNameTerm} from "../blogs/blogsMongoQueryRepository";
import {getFromBD, getTotalCount, helper} from "../utils";
import {mapToOutputUsers} from "./usersRepository";

type UsersOutType = {
    "pagesCount": number,
    "page": number,
    "pageSize": number,
    "totalCount": number,
    "items": [
        {
            "id": string,
            "login": string,
            "email": string,
            "createdAt": string
        }
    ]
}

export const findAllUsers = async (query: any) => {
    const params: any = helper(query)
    const filter = searchNameTerm(params.searchNameTerm)
    const users: any[] = await getFromBD(params, filter, 'user')
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


//     return {
//         "pagesCount": 0,
//         "page": 0,
//         "pageSize": 0,
//         "totalCount": 0,
//         "items": [
//             {
//                 "id": "string",
//                 "login": "string",
//                 "email": "string",
//                 "createdAt": "2024-05-03T10:45:30.047Z"
//             }
//         ]
//     }
// }