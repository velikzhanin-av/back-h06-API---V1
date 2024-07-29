import {blogCollection, commentCollection, postCollection} from "../../db/mongoDb";
import {mapToOutputBlogs} from "../blogs/blogsQueryRepository";
import {ObjectId} from "mongodb";

export const commentsRepository = {

    async deleteComment(id: string) {
        try {
            await commentCollection.deleteOne({_id: new ObjectId(id)})
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async editComment(id: string, content: string) {
        try {
            const res = await commentCollection.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    content,
                }
            })
            return res.matchedCount !== 0
        } catch (err) {
            console.log(err)
            return false
        }
    }
}