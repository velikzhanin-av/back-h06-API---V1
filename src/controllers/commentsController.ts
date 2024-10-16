import {Request, Response} from "express";
import {CommentsServices} from "../services/commentsServices";
import {RequestWithUser} from "../types/usersTypes";
import {ResultCode} from "../types/resultCode";
import {CommentUserView} from "../types/dbTypes";

export class CommentsController {
    static async getCommentById(req: RequestWithUser, res: Response) {
        const userId: string | null = req.user ? req.user._id.toString() : null
        const result: ResultCode<null | CommentUserView> = await CommentsServices.findCommentById(req.params.id, userId)
        if (!result.data) {
            res.sendStatus(result.statusCode)
            return
        }

        res
            .status(result.statusCode)
            .json(result.data)
    }

    static async deleteCommentById(req: Request, res: Response) {
        // @ts-ignore
        const result = await CommentsServices.deleteComment(req.params.commentId, req.user._id.toString())
        if (!result.isOwner) {
            res.sendStatus(403)
            return
        }
        if (!result.action) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
        return
    }

    static async putCommentById(req: Request, res: Response) {
        // @ts-ignore
        const result = await CommentsServices.editComment(req.params.commentId, req.user._id.toString(), req.body.content)
        if (!result.isOwner) {
            res.sendStatus(403)
            return
        }
        if (!result.action) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
        return
    }

    static async putCommentLikeStatus(req: RequestWithUser, res: Response) {
        const result: ResultCode<null> = await CommentsServices.editCommentLikeStatus(req.params.commentId, req.user!, req.body.likeStatus)

        res.sendStatus(result.statusCode)
    }
}