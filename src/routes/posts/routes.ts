import {Router} from "express";
import {authMiddleware} from "../../middlewares/authMiddleware";
import {getAllPosts} from "../../controllers/posts/getAllPosts";
import {postPost} from "../../controllers/posts/postPost";
import {getPostById} from "../../controllers/posts/getPostById";
import {
    blogIdValidation,
    contentValidation,
    postsInputValidation,
    shortDescriptionValidation,
    titleValidation
} from "../../middlewares/postsInputValidation";
import {putPostById} from "../../controllers/posts/putPostById";
import {deletePostById} from "../../controllers/posts/deletePostById";

export const postsRouter = Router()

postsRouter.get('/', getAllPosts)
postsRouter.post('/', authMiddleware,
    shortDescriptionValidation,
    blogIdValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    postPost)
postsRouter.get('/:id', getPostById)
postsRouter.put('/:id', authMiddleware,
    shortDescriptionValidation,
    blogIdValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    putPostById)
postsRouter.delete('/:id', authMiddleware, deletePostById)