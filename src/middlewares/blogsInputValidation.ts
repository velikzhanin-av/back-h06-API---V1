import {body, validationResult} from 'express-validator'
import {Request, Response, NextFunction} from "express";

export const websiteUrlValidation = body('websiteUrl')
    .trim().not().isEmpty()
    .isString()
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    .isLength({max: 100})

export const nameValidation = body('name')
    .trim().not().isEmpty()
    .isString()
    .isLength({max: 15})

export const descriptionValidation = body('description')
    .trim().not().isEmpty()
    .isString()
    .isLength({max: 500})


export const blogsInputValidation = (req: Request, res: Response, next: NextFunction) => {
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