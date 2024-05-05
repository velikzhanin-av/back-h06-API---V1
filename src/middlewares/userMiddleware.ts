import {body, validationResult} from 'express-validator'
import {Request, Response, NextFunction} from "express";

export const loginValidation = body("login")
    .trim().not().isEmpty()
    .isString()
    .isLength({max: 10, min: 3})
    .matches('^[a-zA-Z0-9_-]*$')

export const passwordValidation = body("password")
    .trim().not().isEmpty()
    .isString()
    .isLength({max: 20, min: 6})

export const emailValidation = body("email")
    .trim().not().isEmpty()
    .isString()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')


export const usersInputValidation = (req: Request, res: Response, next: NextFunction) => {
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