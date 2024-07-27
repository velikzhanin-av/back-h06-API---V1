import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogDbType, PostDbType, UserDbType} from "./dbTypes";

// получение доступа к бд
const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db: Db = client.db(SETTINGS.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDbType> = db.collection<any>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDbType> = db.collection<any>(SETTINGS.POST_COLLECTION_NAME)
export const userCollection: Collection<UserDbType> = db.collection<any>(SETTINGS.USER_COLLECTION_NAME)
export const commentCollection: Collection<UserDbType> = db.collection<any>(SETTINGS.COMMENTS_COLLECTION_NAME)


// проверка подключения к бд
export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}