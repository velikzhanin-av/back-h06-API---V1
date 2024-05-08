import {body, validationResult} from 'express-validator'
import {Request, Response, NextFunction} from "express";
import {findBlogById} from "../repositories/blogs/blogsRepository";

export const shortDescriptionValidation = body("shortDescription")
    .trim().not().isEmpty()
    .isString()
    .isLength({max: 100})

export const titleValidation = body("title")
    .trim().not().isEmpty()
    .isString()
    .isLength({max: 30})

export const contentValidation = body("content")
    .trim().not().isEmpty()
    .isString()
    .isLength({max: 1000})

export const blogIdValidation = body('blogId')
    .custom(async (blogId, { req }) => {
            const blog = await findBlogById(blogId)
            if (!blog) {
                throw new Error('no exist blog')
            }
        }
    )

export const postsInputValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res
            .status(400)
            .json({
                errorsMessages: (errors.array({onlyFirstError: true}) as {
                    path: string,
                    msg: string
                }[]).map(x => ({
                    message: x.msg,
                    field: x.path,
                }))
            })
        return
    }
    next()
}