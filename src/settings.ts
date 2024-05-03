import {config} from "dotenv"

config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'

export const SETTINGS = {
    PORT: process.env.port || 3000,
    MONGO_URL: mongoURI,
    DB_NAME: 'h03-API',
    BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || 'blogs',
    POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || 'posts',
    PATH: {
        BLOGS: '/blogs',
        TESTING: '/testing',
        POSTS: '/posts',
        USERS: '/users',
    },
}

console.log(process.env.MONGO_URL)