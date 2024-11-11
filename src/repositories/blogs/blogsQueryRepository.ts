import {postCollection} from "../../db/mongoDb";
import {BlogDbType, PostDbType} from "../../types/dbTypes";
import {ObjectId} from "mongodb";
import {PostsRepository} from "../posts/postsRepository";
import {getTotalCount, helper} from "../utils";
import {BlogModel} from "../../models/blogsModel";
import {inject, injectable} from "inversify";
import {PostsQueryRepository} from "../posts/postsQueryRepository";

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

    async findPostsByBlogId(id: string, query: any, userId: string | null) {
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

        const items: Array<any> = await Promise.all(posts.map(async post => {
            let like;
            if (userId) {
                like = await this.postsRepository.findLikeByPostIdAndUserId(post._id!.toString(), userId)
            }
            const newestLikes: Array<any> | undefined = await this.postsRepository.findNewestLikes(post._id!.toString())
            const likeStatus = like ? like.status : 'None';
            return this.mapToOutputPostsFromBd(post, likeStatus, newestLikes)
        }));
        return {
            pagesCount: Math.ceil(totalCount / params.pageSize),
            page: params.pageNumber,
            pageSize: params.pageSize,
            totalCount: totalCount,
            items
        }
    }

    mapToOutputPostsFromBd(post: any, likeStatus: string, newestLikes: Array<any> | undefined)  {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                dislikesCount: post.extendedLikesInfo.dislikesCount,
                likesCount: post.extendedLikesInfo.likesCount,
                myStatus: likeStatus,
                newestLikes
            },
        }
    }

}














