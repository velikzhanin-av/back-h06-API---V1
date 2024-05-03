import {Router} from "express";
import {blogsRouter} from "../blogs/routes";
import {getAllUsers} from "../../controllers/users/getAllUsers";

export const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.post('/', )
usersRouter.delete('/:id', )