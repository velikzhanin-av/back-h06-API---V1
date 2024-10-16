import {ObjectId, WithId} from "mongodb";
import {CommentDbType, LikesDbType} from "../../types/dbTypes";
import {LikesModel} from "../../models/likesModel";
import {CommentsModel} from "../../models/commentsModel";

// перевести на CommentModel mongoose
export class CommentsRepository {

    static async deleteComment(id: string) {
        try {
            await CommentsModel.deleteOne({_id: new ObjectId(id)})
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async getCommentById(commentId: string) {
        try {
            const comment: WithId<CommentDbType> | null = await CommentsModel.findOne({_id: new ObjectId(commentId)})
            if (!comment) return

            return comment
        } catch (err) {
            console.log(err)
            return
        }
    }

    static async editComment(id: string, content: string) {
        try {
            const res = await CommentsModel.updateOne({_id: new ObjectId(id)}, {
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

    static async updateLikesCountComment(commentId: string, likesCount: number, dislikesCount: number) {
        try {
            return await CommentsModel.updateOne({_id: new ObjectId(commentId)}, {
                $set: {
                    "likesCount.likesCount": likesCount,
                    "likesCount.dislikesCount": dislikesCount,
                }
            })
        } catch (e) {
            console.log(e)
            return
        }
    }

    static async updateLike(_id: ObjectId, status: string) {
        try {
            return await LikesModel.updateOne({_id}, {status})
        } catch (e) {
            console.log(e)
            return
        }
    }

    static async findLikeByUserId(userId: string) {
        try {
            return await LikesModel.findOne({_id: new ObjectId(userId)})
        } catch (e) {
            console.log(e)
            return
        }
    }

}