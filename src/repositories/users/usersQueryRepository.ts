import {BlogDbType, UserDbType} from "../../types/dbTypes";
import {mapToOutputBlogs, searchNameTerm} from "../blogs/blogsQueryRepository";
import {getFromBD, getTotalCount, helper} from "../utils";
import {mapToOutputUsers} from "./usersRepository";
import {userCollection} from "../../db/mongoDb";

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
    const filter = searchLoginOrEmailTerm(params.searchLoginTerm, params.searchEmailTerm)
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

export const searchLoginOrEmailTerm = (loginTerm: string, emailTerm: string) => {
    const search: any = {
        $or: []
    }
    if (loginTerm) {
        search.$or.push({ login: { $regex: loginTerm, $options: 'i' } })}

    if (emailTerm) {
        search.$or.push({ email: { $regex: emailTerm, $options: 'i' } })}
    if (search.$or.length === 0) {
        return {}
    }
    return search
}

export const findUserInfo = (token: string) => {
    return
}