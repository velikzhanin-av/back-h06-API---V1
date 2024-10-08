import mongoose from 'mongoose'
import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {
    BlogDbType,
    PostDbType,
    RateLimitDbType,
    SessionsDbType,
    TokenBlackListDbType,
    UserDbType
} from "../types/dbTypes";

// получение доступа к бд
const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db: Db = client.db(SETTINGS.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDbType> = db.collection<any>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDbType> = db.collection<any>(SETTINGS.POST_COLLECTION_NAME)
export const userCollection: Collection<UserDbType> = db.collection<any>(SETTINGS.USER_COLLECTION_NAME)
export const commentCollection: Collection<UserDbType> = db.collection<any>(SETTINGS.COMMENTS_COLLECTION_NAME)
export const tokenBlackListCollection: Collection<TokenBlackListDbType> = db.collection<any>(SETTINGS.TOKEN_BLACK_LIST)
export const sessionsCollection: Collection<SessionsDbType> = db.collection<any>(SETTINGS.SESSIONS_COLLECTION_NAME)
export const rateLimitCollection: Collection<RateLimitDbType> = db.collection<any>(SETTINGS.RATE_LIMIT_COLLECTION_NAME)


// проверка подключения к бд
export const connectToDB = async () => {
    try {
        await client.connect()
        await mongoose.connect(SETTINGS.MONGO_URL)
        console.log(`connected to db ${SETTINGS.DB_NAME}`)
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        await mongoose.disconnect()
        return false
    }
}