import {userCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {usersRouter} from "../../routes/users/routes";

export const mapToOutputUsers = (user: any) => { // TODO не работает с типизацией!!!
    return {
        id: user._id?.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    }
}

export const createUserInDB = async (body: any) => {
    const newUser =
        {
            login: body.login,
            password: body.password,
            email: body.email,
            createdAt: new Date().toISOString()
        }
    const result = await userCollection.insertOne(newUser)
    // TODO проверить позже изменение переменной
    return mapToOutputUsers(newUser)
}

export const deleteUserInBD = async (id: string) => {
    try {
        const res = await userCollection.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount !== 0
    } catch (err) {
        console.log(err)
        return false
    }
}

// const findByLoginOrEmail = async (LoginOrEmail: string) => {
//     return await userCollection()
// }