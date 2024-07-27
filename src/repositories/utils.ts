import {SortDirection} from "mongodb";
import {blogCollection, commentCollection, postCollection, userCollection} from "../db/mongoDb";

export const helper = (query: any) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null,
    }
}

export const getTotalCount = async (filter: any, section: string) => {
    if (section === 'blog') {
        return await blogCollection.countDocuments(filter)
    } else if (section === 'post') {
        return await postCollection.countDocuments(filter)
    } else if (section === 'user') {
        return await userCollection.countDocuments(filter)
    } else if (section === 'comment') {
        return await commentCollection.countDocuments(filter)
    }
    return 0
}

export const getFromBD = async (params: any, filter: any, sector: string) => {
    if (sector === 'blog') {
        return await blogCollection
            .find(filter)
            .sort(params.sortBy, params.sortDirection)
            .skip((params.pageNumber - 1) * params.pageSize)
            .limit(params.pageSize)
            .toArray() as any[] /*SomePostType[]*/
    } else if (sector === 'user') {
        return await userCollection
            .find(filter)
            .sort(params.sortBy, params.sortDirection)
            .skip((params.pageNumber - 1) * params.pageSize)
            .limit(params.pageSize)
            .toArray() as any[] /*SomePostType[]*/
    }
    return []
}