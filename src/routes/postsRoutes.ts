import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {
    blogIdValidation,
    contentValidation,
    postsInputValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middlewares/postsInputValidation";
import {postsController} from "../controllers/postsController";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {commentContentValidation, commentsInputValidation} from "../middlewares/commentsInputValidation";
import {userFromAccessToken} from "../middlewares/userFromAccessToken";

export const postsRouter = Router()

postsRouter.get('/', postsController.getAllPosts)
postsRouter.post('/', authMiddleware,
    shortDescriptionValidation,
    blogIdValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    postsController.postPost)
postsRouter.get('/:id', postsController.getPostById)
postsRouter.put('/:id', authMiddleware,
    shortDescriptionValidation,
    blogIdValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    postsController.putPostById)
postsRouter.delete('/:id', authMiddleware,
    postsController.deletePostById)
postsRouter.get('/:id', postsController.getPostById)
postsRouter.post('/:postId/comments', authTokenMiddleware,
    commentContentValidation,
    commentsInputValidation,
    postsController.postCommentsByPostId)
postsRouter.get('/:postId/comments', userFromAccessToken,
    postsController.getCommentsByPostId)