import {Request, Response} from "express";
import {findAllPosts, findCommentsByPostId} from "../repositories/posts/postsQueryRepository";
import {createPost, deletePost, editPost, findPostById} from "../repositories/posts/postsRepository";
import {postsServices} from "../services/postsServices";

export const postsController = {
    async getAllPosts(req: Request, res: Response) {
        const db = await findAllPosts(req.query)
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
        const newPost = await createPost(req)
        res
            .status(201)
            .json(newPost)
    },

    async putPostById(req: Request, res: Response) {
        const result = await editPost(req.params.id, req.body)
        if (!result) {
            res.sendStatus(404)
        } else {res.sendStatus(204)}
    },

    async deletePostById(req: Request, res: Response) {
        const result = await deletePost(req.params.id)
        if (!result) {
            res.sendStatus(404)
            return
        } else {res.sendStatus(204)}
    },

    async postCommentsByPostId(req: Request, res: Response) {
        // @ts-ignore
        res.status(201).json(await postsServices.createCommentByPostId(req.params.id, req.body.content, req.user))
        return
    },

    async getCommentsByPostId(req: Request, res: Response) {
        // @ts-ignore
        res.status(200).json(await findCommentsByPostId(req.params))
        return
    }
}