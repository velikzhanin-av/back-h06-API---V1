import mongoose from "mongoose";
import {LikesDbType, LikesInfo, likeStatus} from "../types/dbTypes";

export const LikesInfoSchema = new mongoose.Schema<LikesInfo>({
    likesCount: { type: Number, require: true },
    dislikesCount: { type: Number, require: true },
    // myStatus: {type: String, enam: Object.values(likeStatus),  required: true, default: likeStatus.None}
})
export const LikesSchema = new mongoose.Schema<LikesDbType>({
    // _id: { type: String, require: true },
    createdAt: { type: String, require: true },
    commentId: {type: String, require: true},
    userId: { type: String, require: true },
    userLogin: { type: String, require: true },
    status: {type: String, enam: Object.values(likeStatus),  required: true, default: likeStatus.None}
})
export const LikesModel = mongoose.model<LikesDbType>('likes', LikesSchema)


