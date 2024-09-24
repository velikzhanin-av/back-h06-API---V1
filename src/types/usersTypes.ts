import {Request} from "express";
import {WithId} from "mongodb";
import {UserDbType} from "./dbTypes";

export interface RequestWithUser extends Request {
    user?: WithId<UserDbType>;
}