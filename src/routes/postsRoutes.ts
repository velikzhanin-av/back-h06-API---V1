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
postsRouter.post('/:id/comments', authMiddleware,
    postsController.getCommentsByPostId)