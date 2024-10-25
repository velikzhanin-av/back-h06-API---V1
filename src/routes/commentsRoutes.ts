import {Router} from "express";

import {CommentsController} from "../controllers/commentsController";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {
    commentContentValidation,
    commentLikeStatusValidation,
    commentsInputValidation
} from "../middlewares/commentsInputValidation";
import {userFromAccessToken} from "../middlewares/userFromAccessToken";

export const commentsRouter = Router()

commentsRouter.get('/:id', userFromAccessToken,
    CommentsController.getCommentById)
commentsRouter.delete('/:commentId', authTokenMiddleware, CommentsController.deleteCommentById)
commentsRouter.put('/:commentId', authTokenMiddleware,
    commentContentValidation,
    commentsInputValidation, CommentsController.putCommentById)
commentsRouter.put('/:commentId/like-status', authTokenMiddleware,
    commentLikeStatusValidation,
    commentsInputValidation, CommentsController.putCommentLikeStatus)
