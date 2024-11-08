import {postCollection} from "../../db/mongoDb";
import {BlogDbType, PostDbType} from "../../types/dbTypes";
import {ObjectId} from "mongodb";
import {PostsRepository} from "../posts/postsRepository";
import {getTotalCount, helper} from "../utils";
import {BlogModel} from "../../models/blogsModel";
import {injectable} from "inversify";

@injectable()
export class BlogsQueryRepository {

    constructor(protected postsRepository: PostsRepository) {
    }

    mapToOutputBlogs(blog: any) {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }

    async findAllBlogs(query: any) {
        const params: any = helper(query)
        const filter = this.searchNameTerm(params.searchNameTerm)
        let blogs: BlogDbType[] = await this.getBlogsFromBD(params, filter)
        const totalCount: number = await getTotalCount(filter, 'blog')
        return {
            pagesCount: Math.ceil(totalCount / params.pageSize),
            page: params.pageNumber,
            pageSize: params.pageSize,
            totalCount: totalCount,
            items: blogs.map((blog: BlogDbType) => {
                return this.mapToOutputBlogs(blog)
            })
        }
    }

    async findBlogByIdQuery(blogId: string) {
        try {
            const blog = await BlogModel.findOne({_id: new ObjectId(blogId)})
            if (!blog) return

            return this.mapToOutputBlogs(blog)
        } catch (err) {
            return
        }
    }

    async getBlogsFromBD(params: any, filter: any) {
        return await BlogModel
            .find(filter)
            .sort({[params.sortBy]: params.sortDirection}) // Сортировка
            .skip((params.pageNumber - 1) * params.pageSize) // Пропуск документов для пагинации
            .limit(params.pageSize) // Лимит на количество возвращаемых документов
            .lean() // Преобразование документов Mongoose в простые объекты JavaScript (аналог `toArray`)
            .exec(); // Выполнение запроса
    }

    searchNameTerm(searchNameTerm: any) {
        const search = searchNameTerm
            ? {name: {$regex: searchNameTerm, $options: 'i'}}
            : {}
        return {
            ...search,
        }
    }

    async findPostsByBlogId(id: string, query: any) {
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
                return this.postsRepository.mapToOutputPosts(post)
            })
        }
    }

}














