import {Router} from "express";
import {deleteDb} from "../../controllers/testing/deleteDb";

export const testingRouter = Router()

testingRouter.delete('/all-data', deleteDb)