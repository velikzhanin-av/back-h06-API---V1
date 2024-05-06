import {createUserInDB, deleteUserInBD} from "../../repositories/users/usersRepository";

export const createUser = async (body: any) => {
    return await createUserInDB(body)
}

export const deleteUser = async (id: string) => {
    return await deleteUserInBD(id)
}