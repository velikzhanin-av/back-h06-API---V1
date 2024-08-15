import {ObjectId} from "mongodb";

export type BlogDbType = {
    _id?: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type PostDbType = {
    _id?: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type UserDbType = {
    _id?: ObjectId
    login: string,
    password: string
    email: string
    createdAt: string
    emailConfirmation: {
        confirmationCode: string
        expirationDate: string
        isConfirmed: boolean
    }
}

export type TokenBlackListDbType = {
    _id?: ObjectId
    userId: string
    refreshToken: string
    }

export type SessionsDbType = {
    _id?: ObjectId
    userId: string
    deviceId: string
    iat: string
}
