import {body, validationResult} from 'express-validator'
import {NextFunction, Request, Response} from "express";


export const loginValidation = body("login")
    .trim().not().isEmpty()
    .isString()
    .isLength({min: 3, max: 10})
    .matches('^[a-zA-Z0-9_-]*$')

export const passwordValidation = body("password")
    .trim().not().isEmpty()
    .isLength({min: 6, max: 20})

export const emailValidation = body("email")
    .trim().not().isEmpty()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

export const codeValidation = body("code")
    .trim().not().isEmpty()
    .isString()

export const authInputValidation = (req: Request, res: Response, next: NextFunction) => {
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

