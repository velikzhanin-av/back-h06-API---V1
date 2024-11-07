import {Request, Response} from "express";
import {PostsQueryRepository} from "../repositories/posts/postsQueryRepository";
import {createPost, deletePost, editPost, findPostById} from "../repositories/posts/postsRepository";
import {CommentsServices} from "../services/commentsServices";
import {RequestWithUser} from "../types/usersTypes";
import {ResultCode} from "../types/resultCode";
import {container} from "../compositionRoot";

const commentsServices = container.resolve<CommentsServices>(CommentsServices)
const postsQueryRepository = container.resolve<PostsQueryRepository>(PostsQueryRepository)



export const postsController = {
    async getAllPosts(req: Request, res: Response) {
        const db = await postsQueryRepository.findAllPosts(req.query)
        res
            .status(200)
            .json(db)
    },

    async getPostById(req: Request, res: Response) {
        const post = await findPostById(req.params.id)
        if (!post) {
            res
                .sendStatus(404)
            return
        }
        res
            .status(200)
            .json(post)
    },

    async postPost(req: Request, res: Response) {
        const result = await postsServices.createPost(req.body)
        res
            .status(201)
            .json(result)
    },

    async putPostById(req: Request, res: Response) {
        const result = await editPost(req.params.id, req.body)
        if (!result) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    },

    async deletePostById(req: Request, res: Response) {
        const result = await deletePost(req.params.id)
        if (!result) {
            res.sendStatus(404)
            return
        } else {
            res.sendStatus(204)
        }
    },

    async postCommentsByPostId(req: RequestWithUser, res: Response) {
        const result = await commentsServices.createComment(req.params.postId, req.body.content, req.user)
        if (!result) {
            res.sendStatus(404)
            return
        }
        res
            .status(201)
            .json(result)
        return
    },

    async getCommentsByPostId(req: RequestWithUser, res: Response) {
        const userId: string | null = req.user ? req.user._id.toString() : null
        const result: ResultCode<object|null> = await commentsServices.findComments(req.query, req.params.postId, userId)

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
}