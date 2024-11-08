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
import {BlogsController} from "../controllers/blogsController";
import {CommentsController} from "../controllers/commentsController";
import {container} from "../compositionRoot";

const blogsController: BlogsController = container.resolve<BlogsController>(BlogsController)

export const blogsRouter = Router()

blogsRouter.get('/', blogsController.getAllBlogs.bind(blogsController))
blogsRouter.post('/', authMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    blogsInputValidation,
    blogsController.postBlog.bind(blogsController))
blogsRouter.get('/:id', blogsController.getBlogById.bind(blogsController))
blogsRouter.put('/:id', authMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    blogsInputValidation,
    blogsController.updateBlogById.bind(blogsController))
blogsRouter.delete('/:id', authMiddleware,
    blogsController.deleteBlogById.bind(blogsController))
blogsRouter.get('/:blogId/posts', blogsController.getPostsByBlogId.bind(blogsController))
blogsRouter.post('/:blogId/posts', authMiddleware,
    shortDescriptionValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    blogsController.postedPostsByBlogId.bind(blogsController))

