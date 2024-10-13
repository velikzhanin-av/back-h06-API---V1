import {Router} from "express";

import {commentsController} from "../controllers/commentsController";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {
    commentContentValidation,
    commentLikeStatusValidation,
    commentsInputValidation
} from "../middlewares/commentsInputValidation";

export const commentsRouter = Router()

commentsRouter.get('/:id', commentsController.getCommentById)
commentsRouter.delete('/:commentId', authTokenMiddleware, commentsController.deleteCommentById)
commentsRouter.put('/:commentId', authTokenMiddleware,
    commentContentValidation,
    commentsInputValidation, commentsController.putCommentById)
commentsRouter.put('/:commentId/like-status', authTokenMiddleware,
    commentLikeStatusValidation,
    commentsInputValidation, commentsController.putCommentLikeStatus)
