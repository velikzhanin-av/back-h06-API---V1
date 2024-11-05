import { Container} from 'inversify';
import {CommentsController} from "./controllers/commentsController";
import {CommentsServices} from "./services/commentsServices";
import {CommentsRepository} from "./repositories/comments/commentsRepository";
import {PostsQueryRepository} from "./repositories/posts/postsQueryRepository";


export const container = new Container()

container.bind(CommentsRepository).to(CommentsRepository)
container.bind(PostsQueryRepository).to(PostsQueryRepository)
container.bind(CommentsServices).to(CommentsServices)
container.bind(CommentsController).to(CommentsController)





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