import {postCollection} from "../../db/mongoDb";
import {BlogDbType, PostDbType} from "../../types/dbTypes";
import {ObjectId} from "mongodb";
import {mapToOutputPosts} from "../posts/postsRepository";
import {getTotalCount, helper} from "../utils";
import {BlogModel} from "../../models/blogsModel";

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

export const findBlogByIdQuery = async (blogId: string) => {
    try {
        const blog = await BlogModel.findOne({_id: new ObjectId(blogId)})
        if (!blog) return

        return mapToOutputBlogs(blog)
    } catch (err) {
        return
    }
}

const getBlogsFromBD = async (params: any, filter: any) => {
    return await BlogModel
        .find(filter)
        .sort({[params.sortBy]: params.sortDirection}) // Сортировка
        .skip((params.pageNumber - 1) * params.pageSize) // Пропуск документов для пагинации
        .limit(params.pageSize) // Лимит на количество возвращаемых документов
        .lean() // Преобразование документов Mongoose в простые объекты JavaScript (аналог `toArray`)
        .exec(); // Выполнение запроса
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

