import {db} from "../../db/db";

export const findAllPosts = () => {
    return db.posts
}

export const createPost = (data:any) => {
    const newPost =
        {
            "id": Math.random().toString(36).substring(2) + Math.floor(Math.random() * 100000),
            "title": data.title,
            "shortDescription": data.shortDescription,
            "content": data.content,
            "blogId": data.blogId,
            "blogName": "ewpfkwkjefkwj"
        }
    db.posts.push(newPost)
    return newPost
}

export const findPostById = (id: string) => {
    for (let item of db.posts) {
        if (item.id === id) {
            return item
        }
    }
}

export const editPost = (id: string, body: any) => {
    const post = db.posts.find(item => item.id == id)
    if (!post) {
        return false
    }
    for (let key in body) {
        post[key] = body[key]
    }
    return true
}

export const deletePost = (id: string) => {
    const post = db.posts.find(item => item.id == id)
    if (!post) {
        return false
    }
    db.posts = db.posts.filter(obj => obj.id !== id)
    return true
}