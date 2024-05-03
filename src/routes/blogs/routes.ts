import {Router} from "express";
import {getAllBlogs} from "../../controllers/blogs/getAllBlogs";
import {postBlog} from "../../controllers/blogs/postBlog";
import {getBlogById} from "../../controllers/blogs/getBlogById";
import {updateBlogById} from "../../controllers/blogs/updateBlogById";
import {deleteBlogById} from "../../controllers/blogs/deleteBlogById";
import {
    blogsInputValidation,
    descriptionValidation,
    nameValidation,
    websiteUrlValidation
} from "../../middlewares/blogsInputValidation";
import {authMiddleware} from "../../middlewares/authMiddleware";
import {getPostsByBlogId} from "../../controllers/blogs/getPostByBlogId";
import {postedPostsByBlogId} from "../../controllers/blogs/postedPostsByBlogId";
import {
    blogIdValidation,
    contentValidation, postsInputValidation,
    shortDescriptionValidation,
    titleValidation
} from "../../middlewares/postsInputValidation";

export const blogsRouter = Router()

blogsRouter.get('/', getAllBlogs)
blogsRouter.post('/', authMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    blogsInputValidation,
    postBlog)
blogsRouter.get('/:id', getBlogById)
blogsRouter.put('/:id', authMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    blogsInputValidation,
    updateBlogById)
blogsRouter.delete('/:id', authMiddleware, deleteBlogById)
blogsRouter.get('/:blogId/posts', getPostsByBlogId)
blogsRouter.post('/:blogId/posts', authMiddleware,
    shortDescriptionValidation,
    titleValidation,
    contentValidation,
    postsInputValidation,
    postedPostsByBlogId)

