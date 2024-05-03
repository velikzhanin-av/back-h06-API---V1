import {db} from "../../db/db";

export const findAllBlogs = () => {
    return db.blogs
}

export const createBlog = (data:any) => {
    const newBlog =
        {
            "id": data.id,
            "name": data.name,
            "description": data.description,
            "websiteUrl": data.websiteUrl
        }
    db.blogs.push(newBlog)
        return newBlog
    }

export const findBlogById = (id: string) => {
    // const blog = db.blogs.find(item => item.id == data)
    for (let item of db.blogs) {
        if (item.id === id) {
            return item
        }
    }
}

export const editBlog = (id: string, body: any) => {
    const blog = db.blogs.find(item => item.id == id)
    if (!blog) {
        return false
    }
    for (let key in body) {
        blog[key] = body[key]
    }
        return true
}

export const deleteBlog = (id: string) => {
    const blog = db.blogs.find(item => item.id == id)
    if (!blog) {
        return false
    }
    db.blogs = db.blogs.filter(obj => obj.id !== id)
    return true
}