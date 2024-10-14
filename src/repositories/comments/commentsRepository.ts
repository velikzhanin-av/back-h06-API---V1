import {commentCollection} from "../../db/mongoDb";
import {ObjectId, WithId} from "mongodb";
import {CommentDbType, LikesDbType} from "../../types/dbTypes";
import {LikesModel} from "../../models/likesModel";



// перевести на CommentModel mongoose
export class CommentsRepository {

    static async deleteComment(id: string) {
        try {
            await commentCollection.deleteOne({_id: new ObjectId(id)})
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async getCommentById(commentId: string) {
        try {
            const comment: WithId<CommentDbType> | null = await commentCollection.findOne({_id: new ObjectId(commentId)})
            if (!comment) return

            return comment
        } catch (err) {
            console.log(err)
            return
        }
    }

    static async editComment(id: string, content: string) {
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

    static async findLikeByCommentAndUser(userId: string, commentId: string) {
        try {
            return await LikesModel.findOne({userId, commentId})
        } catch (e) {
            console.log(e)
            return
        }
    }

    static async createLike(newLike: LikesDbType) {
        try {
            return await LikesModel.create(newLike)
        } catch (e) {
            console.log(e)
            return
        }
    }
}