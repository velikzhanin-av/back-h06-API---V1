import {createUserInDB} from "../../repositories/users/usersRepository";

export const createUser = async (body: any) => {
    const res = await createUserInDB(body)
    console.log(res)
    return res
}