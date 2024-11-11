import {Request, Response} from "express";
import {PostsQueryRepository} from "../repositories/posts/postsQueryRepository";
import {CommentsServices} from "../services/commentsServices";
import {RequestWithUser} from "../types/usersTypes";
import {ResultCode} from "../types/resultCode";
import {PostsRepository} from "../repositories/posts/postsRepository";
import {PostsServices} from "../services/postsServices";
import {injectable} from "inversify";

@injectable()
export class PostsController {

    constructor(protected commentsServices: CommentsServices,
                protected postsQueryRepository: PostsQueryRepository,
                protected postsRepository: PostsRepository,
                protected postsServices: PostsServices) {
    }

    async getAllPosts(req: RequestWithUser, res: Response) {
        const userId: string | null = req.user ? req.user._id.toString() : null
        const db = await this.postsQueryRepository.findAllPosts(req.query, userId)
        res
            .status(200)
            .json(db)
    }

    async getPostById(req: RequestWithUser, res: Response) {
        const userId: string | null = req.user ? req.user._id.toString() : null
        const result = await this.postsServices.findPostById(req.params.id, userId)
        if (!result.data) {
            res
                .sendStatus(result.statusCode)
            return
        }
        res
            .status(result.statusCode)
            .json(result.data)
    }

    async postPost(req: Request, res: Response) {
        const result = await this.postsServices.createPost(req.body)
        console.log(result.data)
        res
            .status(result.statusCode)
            .json(result.data)
    }

    async putPostById(req: Request, res: Response) {
        const result = await this.postsRepository.editPost(req.params.id, req.body)
        if (!result) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    }

    async deletePostById(req: Request, res: Response) {
        const result = await this.postsRepository.deletePost(req.params.id)
        if (!result) {
            res.sendStatus(404)
            return
        } else {
            res.sendStatus(204)
        }
    }

    async postCommentsByPostId(req: RequestWithUser, res: Response) {
        const result = await this.commentsServices.createComment(req.params.postId, req.body.content, req.user)
        if (!result) {
            res.sendStatus(404)
            return
        }
        res
            .status(201)
            .json(result)
        return
    }

    async getCommentsByPostId(req: RequestWithUser, res: Response) {
        const userId: string | null = req.user ? req.user._id.toString() : null
        const result: ResultCode<object|null> = await this.commentsServices.findComments(req.query, req.params.postId, userId)

        if (!result.data) {
            res.sendStatus(result.statusCode)
            return
        }

        res
            .status(result.statusCode)
            .json(result.data)

        // if (!comments) {
        //     res.sendStatus(404)
        //     return
        // }
        // res
        //     .status(200)
        //     .json(comments)
        return
    }

    async putPostLikeStatus(req: RequestWithUser, res: Response) {
        const result: ResultCode<null> = await this.postsServices.editPostLikeStatus(req.params.postId, req.user!, req.body.likeStatus)

        res.sendStatus(result.statusCode)
    }

}