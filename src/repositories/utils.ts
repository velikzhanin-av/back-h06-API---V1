import {SortDirection} from "mongodb";
import {blogCollection, postCollection, userCollection} from "../db/mongoDb";

export const helper = (query: any) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    }
}

export const getTotalCount = async (filter: any, section: string) => {
    if (section === 'blog') {
        return await blogCollection.countDocuments(filter)
    } else if (section === 'post') {
        return await postCollection.countDocuments(filter)
    } else if (section === 'users') {
        return await userCollection.countDocuments(filter)
    }
}