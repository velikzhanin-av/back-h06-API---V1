import {blogCollection, commentCollection, postCollection} from "../../db/mongoDb";
import {mapToOutputBlogs} from "../blogs/blogsQueryRepository";
import {ObjectId, WithId} from "mongodb";
import {CommentDbType} from "../../types/dbTypes";

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

    async getCommentById(commentId: string) {
        try {
            const comment: WithId<CommentDbType> | null = await commentCollection.findOne({_id: new ObjectId(commentId)})
            if (!comment) return

            return comment
        } catch (err) {
            console.log(err)
            return
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