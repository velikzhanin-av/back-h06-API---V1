import {userCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {bcryptService} from "../../utils/bcriptServices";

export const mapToOutputUsers = (user: any) => { // TODO не работает с типизацией!!!
    return {
        id: user._id?.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    }
}

export const createUser = async (body: any) => {
    const passwordHash = await bcryptService.generateHash(body.password)
    console.log(typeof passwordHash)
    const newUser =
        {
            login: body.login,
            password: passwordHash,
            email: body.email,
            createdAt: new Date().toISOString()
        }
    const result = await userCollection.insertOne(newUser)
    // TODO проверить позже изменение переменной
    return mapToOutputUsers(newUser)
}

export const deleteUser = async (id: string) => {
    try {
        const res = await userCollection.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount !== 0
    } catch (err) {
        console.log(err)
        return false
    }
}

export const findByLoginOrEmail = async (loginOrEmail: string) => {
    return await userCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
}