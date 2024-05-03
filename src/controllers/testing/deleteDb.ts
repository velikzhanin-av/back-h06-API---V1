import {Request, Response} from "express";
import {deleteAll} from "../../repositories/testing/testingMongoRepository";

export const deleteDb = async (req: Request, res: Response) => {
    await deleteAll()
    res.
        sendStatus(204)

}