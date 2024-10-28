import {Router} from "express";

import {CommentsController} from "../controllers/commentsController";
import {authTokenMiddleware} from "../middlewares/authTokenMiddleware";
import {
    commentContentValidation,
    commentLikeStatusValidation,
    commentsInputValidation
} from "../middlewares/commentsInputValidation";
import {userFromAccessToken} from "../middlewares/userFromAccessToken";

const commentsController = new CommentsController()


export const commentsRouter = Router()

commentsRouter.get('/:id', userFromAccessToken,
    commentsController.getCommentById.bind(commentsController))
commentsRouter.delete('/:commentId', authTokenMiddleware,
    commentsController.deleteCommentById.bind(commentsController))
commentsRouter.put('/:commentId', authTokenMiddleware,
    commentContentValidation,
    commentsInputValidation,
    commentsController.putCommentById.bind(commentsController))
commentsRouter.put('/:commentId/like-status', authTokenMiddleware,
    commentLikeStatusValidation,
    commentsInputValidation,
    commentsController.putCommentLikeStatus.bind(commentsController))


