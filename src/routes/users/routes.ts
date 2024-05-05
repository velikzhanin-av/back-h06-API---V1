import {Router} from "express";
import {getAllUsers} from "../../controllers/users/getAllUsers";
import {postUser} from "../../controllers/users/postUser";

export const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.post('/', postUser)
usersRouter.delete('/:id', )