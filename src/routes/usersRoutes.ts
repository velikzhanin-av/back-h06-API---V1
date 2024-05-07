import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {
    emailValidation,
    loginValidation,
    passwordValidation, usersInputValidation,
} from "../middlewares/userMiddleware";
import {usersController} from "../controllers/usersController";

export const usersRouter = Router()

usersRouter.get('/', authMiddleware,
    usersInputValidation,
    usersController.getAllUsers)
usersRouter.post('/',authMiddleware,
    loginValidation,
    passwordValidation,
    emailValidation,
    usersInputValidation,
    usersController.postUser)
usersRouter.delete('/:id',authMiddleware,
    usersController.deleteUserById)