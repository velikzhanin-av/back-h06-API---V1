import {LikesInfo, PostDbType} from "../types/dbTypes";
import mongoose from "mongoose";

export const LikesInfoSchema = new mongoose.Schema<LikesInfo>({
        likesCount: {type: Number, require: true, default: 0},
        dislikesCount: {type: Number, require: true, default: 0},
    },
    {_id: false})

export const PostsSchema = new mongoose.Schema<PostDbType>({
    // _id: { type: String, require: true },
    title: { type: String, require: true },
    shortDescription: { type: String, require: true },
    content: { type: String, require: true },
    createdAt: { type: String, require: true },
    blogId: { type: String, require: true },
    blogName: { type: String, require: true },
    extendedLikesInfo: {type: LikesInfoSchema, required: true}

})
export const PostsModel = mongoose.model<PostDbType>('posts', PostsSchema)