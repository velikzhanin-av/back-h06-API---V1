import {blogCollection, postCollection, userCollection} from "../../db/mongoDb";

export const deleteAll = async () => {
    await blogCollection.deleteMany()
    await postCollection.deleteMany()
    await userCollection.deleteMany()
    return
}
