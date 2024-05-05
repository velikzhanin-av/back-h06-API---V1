import {Router} from "express";
import {getAllUsers} from "../../controllers/users/getAllUsers";
import {postUser} from "../../controllers/users/postUser";
import {authMiddleware} from "../../middlewares/authMiddleware";
import {
    emailValidation,
    loginValidation,
    passwordValidation, usersInputValidation,
} from "../../middlewares/userMiddleware";
import {deleteUser} from "../../services/users/userServices";
import {deleteUserById} from "../../controllers/users/deleteUserById";

export const usersRouter = Router()

usersRouter.get('/', authMiddleware,
    usersInputValidation,
    getAllUsers)
usersRouter.post('/',authMiddleware,
    loginValidation,
    passwordValidation,
    emailValidation,
    usersInputValidation,
    postUser)
usersRouter.delete('/:id',authMiddleware,
    deleteUserById)