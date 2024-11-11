import 'reflect-metadata';
import { Container} from 'inversify';
import {CommentsController} from "./controllers/commentsController";
import {CommentsServices} from "./services/commentsServices";
import {CommentsRepository} from "./repositories/comments/commentsRepository";
import {PostsQueryRepository} from "./repositories/posts/postsQueryRepository";
import {PostsController} from "./controllers/postsController";
import {PostsServices} from "./services/postsServices";
import {PostsRepository} from "./repositories/posts/postsRepository";
import {BlogsRepository} from "./repositories/blogs/blogsRepository";
import {BlogsQueryRepository} from "./repositories/blogs/blogsQueryRepository";
import {BlogsController} from "./controllers/blogsController";
import {BlogsServices} from "./services/blogsServices";


export const container = new Container()

container.bind(CommentsController).to(CommentsController)
container.bind(CommentsServices).to(CommentsServices)
container.bind(CommentsRepository).to(CommentsRepository)

container.bind(PostsController).to(PostsController)
container.bind(PostsServices).to(PostsServices)
container.bind(PostsQueryRepository).to(PostsQueryRepository)
container.bind(PostsRepository).to(PostsRepository)

container.bind(BlogsController).to(BlogsController)
container.bind(BlogsServices).to(BlogsServices)
container.bind(BlogsRepository).to(BlogsRepository)
container.bind(BlogsQueryRepository).to(BlogsQueryRepository)



// const objects: any[] = []
//
// const commentsRepository: CommentsRepository = new CommentsRepository()
// objects.push(commentsRepository)
//
// const postsQueryRepository: PostsQueryRepository = new PostsQueryRepository(commentsRepository)
// objects.push(postsQueryRepository)
//
// const commentsServices: CommentsServices = new CommentsServices(commentsRepository, postsQueryRepository)
// objects.push(commentsServices)
//
// // const commentsController: CommentsController = new CommentsController(commentsServices)
// // objects.push(commentsController)
//
// export const ioc = {
//     getInstance<T>(ClassType: any) {
//         const target = objects.find(o => o instanceof ClassType)
//         return target as T
//     }
// }