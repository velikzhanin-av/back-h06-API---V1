import {ObjectId} from "mongodb";

export type BlogDbType = {
    _id?: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type UserDbType = {
    _id?: ObjectId
    login: string,
    password: string
    email: string
    createdAt: string
    emailConfirmation: EmailConfirmationType
    recoveryCode?: RecoveryCodeType
}

export type EmailConfirmationType = {
    confirmationCode: string
    expirationDate: string
    isConfirmed: boolean
}

export type RecoveryCodeType = {
    recoveryCode: string
    expirationDate: string
}

export type TokenBlackListDbType = {
    _id?: ObjectId
    userId: string
    refreshToken: string
    }

export type SessionsDbType = {
    _id?: ObjectId
    deviceId: string
    userId: string
    iat: Date
    exp: Date
    ip: string
    deviceName: string
}

export type RateLimitDbType = {
    _id?: ObjectId
    ip: string
    url: string
    date: number
}

export type CommentDbType = {
    _id?: ObjectId
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    postId: string
    likesInfo: LikesCount
}

export type CommentUserView = {
    _id?: ObjectId
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    likesCount: LikesInfo
}

export type CommentatorInfo = {
    userId: string
    userLogin: string
}

export type LikesInfo = {
    likesCount: number
    dislikesCount: number
    myStatus: string
}

export type LikesCount = {
    likesCount: number,
    dislikesCount: number,
}

export type LikesDbType = {
    _id?: ObjectId
    createdAt: string
    commentId: string
    userId: string
    userLogin: string
    status: likeStatus
}

export enum likeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

export type PostDbType = {
    _id?: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
    extendedLikesInfo: LikesCount
}

export type PostsLikesDbType = {
    _id?: ObjectId
    addedAt: string
    postId: string
    userId: string
    login: string
    status: likeStatus
}