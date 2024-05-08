import {Request, Response} from "express";
import {deleteAll} from "../repositories/testing/testingRepository";

export const testingController = {
    async deleteDb(req: Request, res: Response) {
        await deleteAll()
        res.sendStatus(204)
    }
}
