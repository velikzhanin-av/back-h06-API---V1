import {RequestWithUser} from "../types/usersTypes";
import {NextFunction, Response} from "express";

export const authRateLimitMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {

}