import {userCollection} from "../../db/mongoDb";
import {ObjectId, WithId} from "mongodb";
import {UserDbType} from "../../types/dbTypes";
import {UserModel} from "../../models/usersModel";

export const mapToOutputUsers = (user: any) => { // TODO не работает с типизацией!!!
    return {
        id: user._id?.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    }
}

export const usersRepository = {
    async createUser (newUser: any)  {
        try {
            const result = await UserModel.create(newUser)
            // TODO проверить позже изменение переменной
            return mapToOutputUsers(newUser)
        } catch (e) {
            console.log(e)
            return
        }

    },

    async findUserById (id: any)  {
        const user: WithId<UserDbType> | null = await userCollection.findOne({_id: new ObjectId(id)})
        return user
    },

    async deleteUser(id: string)  {
        try {
            const res = await userCollection.deleteOne({_id: new ObjectId(id)})
            return res.deletedCount !== 0
        } catch (err) {
            console.log(err)
            return false
        }
    },

    async findByLoginOrEmail(loginOrEmail: string)  {
        return await userCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
    },

    async findByEmail(email: string)  {
        return await UserModel.findOne({email})
    },

    async findByRecoveryCode(recoveryCode: string)  {
        return await UserModel.findOne({'recoveryCode.recoveryCode': recoveryCode}).lean()
    },

    async addJwtToken(id: ObjectId, token: string) {
        const res = await userCollection.updateOne({_id: id}, {$set: {jwtToken: token}})
        return res.acknowledged
    },

    async addRefreshToken(id: ObjectId, token: string) {
        const res = await userCollection.updateOne({_id: id}, {$set: {refreshToken: token}})
        return res.acknowledged
    },

    async verifyJwtToken(token: string) {
        return await userCollection.findOne({jwtToken: token})
    },

    async verifyRefreshToken(token: string) {
        return await userCollection.findOne({refreshToken: token})
    },

    async doesExistByLoginOrEmail(login: string, email: string) {
        if (await userCollection.findOne({login})) {
            return 'login'
        } else if (await userCollection.findOne({email})) {
            return 'email'
        }
        return false
    },

    async findConfirmationCode(code: string) {
        const res = await userCollection.findOne({'emailConfirmation.confirmationCode': code})
        return res
    },

    async updateIsConfirmed(email: string) {
        const res = await userCollection.updateOne({email: email},
            {$set: {'emailConfirmation.isConfirmed': true}})
        return res.modifiedCount > 0
    },

    async updateConfirmationCode(email: string, confirmationCode: string,) {
        const res = await userCollection.updateOne({email: email},
            {$set: {'emailConfirmation.confirmationCode': confirmationCode}})
        return res.modifiedCount > 0
    },

    async updateRecoveryCode(email: string, recoveryCode: string, expirationDate: string) {
        const user = await UserModel.findOne({email})
        if (!user) return
        // остановился здесь, добавил recoveryCode.expirationDate
        user.recoveryCode = {recoveryCode, expirationDate}
        return await user.save()
    },

    async updatePasswordHash(_id: ObjectId, passwordHash: string) {
        const user = await UserModel.findOne({_id})
        if (!user) return
        user.password = passwordHash
        return await user.save()
    }

}