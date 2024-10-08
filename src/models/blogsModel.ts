import {BlogDbType} from "../types/dbTypes";
import mongoose from "mongoose";

export const BlogSchema = new mongoose.Schema<BlogDbType>({
    // _id: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    websiteUrl: { type: String, require: true },
    createdAt: { type: String, require: true },
    isMembership: { type: Boolean, require: true }
})
export const BlogModel = mongoose.model<BlogDbType>('blogs', BlogSchema)