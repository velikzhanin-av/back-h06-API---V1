import {blogCollection, postCollection} from "../../db/mongoDb";

export const deleteAll = async () => {
    await blogCollection.deleteMany()
    await postCollection.deleteMany()
    return
}
