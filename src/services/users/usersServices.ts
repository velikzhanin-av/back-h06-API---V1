import {createUserInDB, deleteUserInBD} from "../../repositories/users/usersRepository";


export const usersServices = {
    async createUser(body: any)  {
        return await createUserInDB(body)
    },

    async deleteUser(id: string)  {
        return await deleteUserInBD(id)
    }
}