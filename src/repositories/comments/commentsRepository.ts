import {ObjectId, WithId} from "mongodb";
import {CommentDbType, LikesDbType} from "../../types/dbTypes";
import {LikesModel} from "../../models/likesModel";
import {CommentsModel} from "../../models/commentsModel";
import {injectable} from "inversify";

// перевести на CommentModel mongoose

@injectable()
export class CommentsRepository {

    async deleteComment(id: string) {
        try {
            await CommentsModel.deleteOne({_id: new ObjectId(id)})
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async getCommentById(commentId: string) {
        try {
            const comment: WithId<CommentDbType> | null = await CommentsModel.findOne({_id: new ObjectId(commentId)})
            if (!comment) return

            return comment
        } catch (err) {
            console.log(err)
            return
        }
    }

    async editComment(id: string, content: string) {
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

    async findLikeByCommentAndUser(userId: string, commentId: string) {
        try {
            return await LikesModel.findOne({userId, commentId})
        } catch (e) {
            console.log(e)
            return
        }
    }

    async createLike(newLike: LikesDbType) {
        try {
            return await LikesModel.create(newLike)
        } catch (e) {
            console.log(e)
            return
        }
    }

    async updateLikesCountComment(commentId: string, likesCount: number, dislikesCount: number) {
        try {
            return await CommentsModel.updateOne({_id: new ObjectId(commentId)}, {
                $set: {
                    "likesInfo.likesCount": likesCount,
                    "likesInfo.dislikesCount": dislikesCount,
                }
            })
        } catch (e) {
            console.log(e)
            return
        }
    }

    async updateLike(_id: ObjectId, status: string) {
        try {
            return await LikesModel.updateOne({_id}, {status})
        } catch (e) {
            console.log(e)
            return
        }
    }

    async findLikeByUserId(commentId: string, userId: string) {
        try {
            return await LikesModel.findOne({commentId, userId})
        } catch (e) {
            console.log(e)
            return
        }
    }

}