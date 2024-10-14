import {Request, Response} from "express";
import {CommentsQueryRepository} from "../repositories/comments/commentsQueryRepository";
import {CommentsServices} from "../services/commentsServices";
import {RequestWithUser} from "../types/usersTypes";
import {ResultCode} from "../types/resultCode";

export class CommentsController {
    static async getCommentById(req: Request, res: Response) {
        const comment: any = await CommentsQueryRepository.findCommentById(req.params.id)
        if (!comment) {
            res.sendStatus(404)
            return
        }
        res
            .status(200)
            .json(comment)
        return
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