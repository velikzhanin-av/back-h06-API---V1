import {Router} from "express";
import {
    blogsInputValidation,
    descriptionValidation,
    nameValidation,
    websiteUrlValidation
} from "../middlewares/blogsInputValidation";
import {authMiddleware} from "../middlewares/authMiddleware";
import {
    contentValidation, postsInputValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middlewares/postsInputValidation";
import {blogsController} from "../controllers/blogsController";

export const blogsRouter = Router()

blogsRouter.get('/', blogsController.getAllBlogs)
blogsRouter.post('/', authMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    blogsInputValidation,
    blogsController.postBlog)
blogsRouter.get('/:id', blogsController.getBlogById)
blogsRouter.put('/:id', authMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    blogsInputValidation,
    blogsController.updateBlogById)
blogsRouter.delete('/:id', authMiddleware, blogsController.deleteBlogById)
blogsRouter.get('/:blogId/posts', blogsController.getPostsByBlogId)
blogsRouter.post('/:blogId/posts', authMiddleware,
    shortDescriptionValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    blogsController.postedPostsByBlogId)

