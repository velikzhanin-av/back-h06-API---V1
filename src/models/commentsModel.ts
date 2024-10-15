import mongoose from "mongoose";
import {CommentatorInfo, CommentDbType, LikesCount, LikesDbType, LikesInfo, likeStatus} from "../types/dbTypes";
import {ObjectId} from "mongodb";

export const LikesInfoSchema = new mongoose.Schema<LikesInfo>({
        likesCount: {type: Number, require: true, default: 0},
        dislikesCount: {type: Number, require: true, default: 0},
    },
    {_id: false})

export const CommentatorInfoSchema = new mongoose.Schema<CommentatorInfo>({
        userId: {type: String, require: true},
        userLogin: {type: String, require: true},
    },
    {_id: false})

export const CommentsSchema = new mongoose.Schema<CommentDbType>({
    // _id: { type: String, require: true },
    content: {type: String, require: true},
    commentatorInfo: CommentatorInfoSchema,
    createdAt: {type: String, require: true},
    postId: {type: String, require: true},
    likesCount: {type: LikesInfoSchema, required: true}
    // myStatus: {type: String, enam: Object.values(likeStatus),  required: true, default: likeStatus.None}
})
export const CommentsModel = mongoose.model<CommentDbType>('comments', CommentsSchema)


