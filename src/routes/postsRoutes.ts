import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {
    blogIdValidation,
    contentValidation,
    postsInputValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middlewares/postsInputValidation";
import {PostsController} from "../controllers/postsController";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {
    commentContentValidation,
    commentLikeStatusValidation,
    commentsInputValidation
} from "../middlewares/commentsInputValidation";
import {userFromAccessToken} from "../middlewares/userFromAccessToken";
import {container} from "../compositionRoot";

const postsController: PostsController = container.resolve<PostsController>(PostsController)

export const postsRouter = Router()

postsRouter.get('/', userFromAccessToken,
    postsController.getAllPosts.bind(postsController))
postsRouter.post('/', authMiddleware,
    shortDescriptionValidation,
    blogIdValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    postsController.postPost.bind(postsController))
postsRouter.get('/:id', userFromAccessToken,
    postsController.getPostById.bind(postsController))
postsRouter.put('/:id', authMiddleware,
    shortDescriptionValidation,
    blogIdValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    postsController.putPostById.bind(postsController))
postsRouter.delete('/:id', authMiddleware,
    postsController.deletePostById.bind(postsController))
// postsRouter.get('/:id', postsController.getPostById.bind(postsController))
postsRouter.post('/:postId/comments', authTokenMiddleware,
    commentContentValidation,
    commentsInputValidation,
    postsController.postCommentsByPostId.bind(postsController))
postsRouter.get('/:postId/comments', userFromAccessToken,
    postsController.getCommentsByPostId.bind(postsController))
postsRouter.put('/:postId/like-status', authTokenMiddleware,
    commentLikeStatusValidation,
    commentsInputValidation,
    postsController.putPostLikeStatus.bind(postsController))