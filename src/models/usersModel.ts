import mongoose from "mongoose";
import {EmailConfirmationType, UserDbType} from "../types/dbTypes";

const emailConfirmationSchema = new mongoose.Schema<EmailConfirmationType>({
    confirmationCode: {type: String, required: false},
    expirationDate: {type: String, required: false},
    isConfirmed: {type: Boolean, required: true}
}, {_id: false});
export const UserSchema = new mongoose.Schema<UserDbType>({
    login: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    createdAt: {type: String, require: true},
    emailConfirmation: {type: emailConfirmationSchema, require: true},
    recoveryCode: {type: String, required: false}
})
export const UserModel = mongoose.model<UserDbType>('users', UserSchema)