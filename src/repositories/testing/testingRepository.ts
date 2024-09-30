import {
    blogCollection,
    commentCollection,
    postCollection, sessionsCollection,
    tokenBlackListCollection,
    userCollection
} from "../../db/mongoDb";

export const deleteAll = async () => {
    await blogCollection.deleteMany()
    await postCollection.deleteMany()
    await userCollection.deleteMany()
    await commentCollection.deleteMany()
    await tokenBlackListCollection.deleteMany()
    await sessionsCollection.deleteMany()
    return
}
