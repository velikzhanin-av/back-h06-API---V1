import {Request, Response} from "express";
import {findAllUsers} from "../repositories/users/usersQueryRepository";
import {commentsQueryRepository} from "../repositories/comments/commentsQueryRepository";
import {commentsServices} from "../services/commentsServices";

export const commentsController = {
    async getCommentById(req: Request, res: Response) {
        const comment: any = await commentsQueryRepository.findCommentById(req.params.id)
        if (!comment) {
            res.sendStatus(404)
            return
        }
        res
            .status(200)
            .json(comment)
        return
    },

    async deleteCommentById(req: Request, res: Response) {
        // @ts-ignore
        const result = await commentsServices.deleteComment(req.params.commentId, req.user._id.toString())
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
    },

    async putCommentById(req: Request, res: Response) {
        // @ts-ignore
        const result = await commentsServices.editComment(req.params.commentId, req.user._id.toString(), req.body.content)
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
    },
}