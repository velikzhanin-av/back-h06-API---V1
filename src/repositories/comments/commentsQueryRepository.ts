import {commentCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {mapToOutputComment} from "../posts/postsRepository";

export const commentsQueryRepository = {

    async findCommentById(id: string) {
        try {
            const comment: any = await commentCollection.findOne({_id: new ObjectId(id)})
            if (!comment) return
            return mapToOutputComment(comment)
        } catch (err) {
            console.log(err)
            return
        }
    },
}