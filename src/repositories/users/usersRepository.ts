import {userCollection} from "../../db/mongoDb";

export const mapToOutputUsers = (user: any) => { // TODO не работает с типизацией!!!
    return {
        id: user._id?.toString(),
        login: user.login,
        password: user.password,
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
    console.log(mapToOutputUsers(newUser))
    return mapToOutputUsers(newUser)
}