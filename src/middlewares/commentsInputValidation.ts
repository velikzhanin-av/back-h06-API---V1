import {body, validationResult} from 'express-validator'
import {NextFunction, Request, Response} from "express";
import {likeStatus} from "../types/dbTypes";


export const commentContentValidation = body("content")
    .trim().not().isEmpty()
    .isString()
    .isLength({min: 20, max: 300})

export const commentLikeStatusValidation = body("likeStatus")
    .trim().not().isEmpty()
    .isString()
    .isIn(Object.values(likeStatus))

export const commentsInputValidation = (req: Request, res: Response, next: NextFunction) => {
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

