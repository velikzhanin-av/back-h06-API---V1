import mongoose from "mongoose";
import {likeStatus, PostsLikesDbType} from "../types/dbTypes";

export const postsLikesSchema = new mongoose.Schema<PostsLikesDbType>({
    // _id: { type: String, require: true },
    addedAt: { type: String, require: true },
    userId: { type: String, require: true },
    postId: { type: String, require: true },
    login: { type: String, require: true },
    status: {type: String, enam: Object.values(likeStatus),  required: true, default: likeStatus.None}
})
export const LikesModel = mongoose.model<PostsLikesDbType>('postsLikes', postsLikesSchema)


