import {ObjectId} from "mongodb";
import {CommentsModel} from "../../models/commentsModel";
import {CommentDbType} from "../../types/dbTypes";

export class CommentsQueryRepository {

    static async findCommentById(id: string) {
        try {
            const comment: any = await CommentsModel.findOne({_id: new ObjectId(id)})
            if (!comment) return
            return mapToUserViewComment(comment)
        } catch (err) {
            console.log(err)
            return
        }
    }
}

export const mapToUserViewComment = (comment: CommentDbType) => { //
    return {
        id: comment._id?.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt,
        likesInfo: {
            likesCount: comment.likesInfo.likesCount,
            dislikesCount: comment.likesInfo.dislikesCount
        }
    }
}