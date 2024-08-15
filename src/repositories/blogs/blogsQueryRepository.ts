import {blogCollection, postCollection} from "../../db/mongoDb";
import {BlogDbType, PostDbType} from "../../types/dbTypes";
import {SortDirection} from "mongodb";
import {mapToOutputPosts} from "../posts/postsRepository";
import {getTotalCount, helper} from "../utils";

export const mapToOutputBlogs = (blog: any) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}



export const findAllBlogs = async (query: any) => {
    const params: any = helper(query)
    const filter = searchNameTerm(params.searchNameTerm)
    let blogs: BlogDbType[] = await getBlogsFromBD(params, filter)
    const totalCount: number = await getTotalCount(filter, 'blog')
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

const getBlogsFromBD = async (params: any, filter: any) => {
    return await blogCollection
        .find(filter)
        .sort(params.sortBy, params.sortDirection)
        .skip((params.pageNumber - 1) * params.pageSize)
        .limit(params.pageSize)
        .toArray() as any[] /*SomePostType[]*/
}

export const searchNameTerm = (searchNameTerm: any) => {
    const search = searchNameTerm
        ? {name: {$regex: searchNameTerm, $options: 'i'}}
        : {}
    return {
        ...search,
    }
}

export const findPostsByBlogId = async (id: string, query: any) => {
    const params = helper(query)
    const filter = {blogId: id}
    const totalCount: number = await getTotalCount(filter, 'post')
    if (!totalCount) {
        return
    }
    const posts: PostDbType[] = await postCollection
        .find(filter)
        .sort(params.sortBy, params.sortDirection)
        .skip((params.pageNumber - 1) * params.pageSize)
        .limit(params.pageSize)
        .toArray() as any[] /*SomePostType[]*/
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

