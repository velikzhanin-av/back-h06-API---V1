import {userCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";

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
        const result = await userCollection.insertOne(newUser)
        // TODO проверить позже изменение переменной
        return mapToOutputUsers(newUser)
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

    async addJwtToken(id: ObjectId, token: string) {
        const res = await userCollection.updateOne({_id: id}, {$set: {jwtToken: token}})
        return res.acknowledged

    },

    async verifyJwtToken(token: string) {
        return await userCollection.findOne({jwtToken: token})
    },

    async doesExistByLoginOrEmail(login: string, email: string) {
        if (await userCollection.findOne({login})) {
            return 'login'
        } else if (await userCollection.findOne({email})) {
            return 'email'
        }
        return false
    },


}