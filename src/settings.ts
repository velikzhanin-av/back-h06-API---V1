import {config} from "dotenv"

config()

const mongoURI = process.env.MONGO_URL || `mongodb://0.0.0.0:27017/homeworkExpress`

export const SETTINGS = {
    PORT: process.env.port || 3000,
    MONGO_URL: mongoURI,
    DB_NAME: 'homeworkExpress',
    BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || 'blogs',
    POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || 'posts',
    USER_COLLECTION_NAME: process.env.USER_COLLECTION_NAME || 'users',
    AUTH_COLLECTION_NAME: process.env.AUTH_COLLECTION_NAME || 'auth',
    SECURITY_COLLECTION_NAME: process.env.SECURITY_COLLECTION_NAME || 'security',
    COMMENTS_COLLECTION_NAME: process.env.COMMENTS_COLLECTION_NAME || 'comments',
    SESSIONS_COLLECTION_NAME: process.env.SESSIONS_COLLECTION_NAME || 'sessions',
    TOKEN_BLACK_LIST: process.env.TOKEN_BLACK_LIST || 'token_black_list',
    RATE_LIMIT_COLLECTION_NAME: process.env.RATE_LIMIT_COLLECTION || 'rateLimitCollection',
    GMAIL_PASS: process.env.GMAIL_PASS,
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY || '111',
    ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || '10s',
    REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL || '20s',
    PATH: {
        BLOGS: '/blogs',
        TESTING: '/testing',
        POSTS: '/posts',
        USERS: '/users',
        AUTH: '/auth',
        COMMENTS: '/comments',
        SECURITY: '/security',
    },
}

console.log(process.env.MONGO_URL)