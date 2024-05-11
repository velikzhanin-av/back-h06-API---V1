import {createUser, deleteUser} from "../../repositories/users/usersRepository";


export const usersServices = {
    async createUser(body: any)  {
        return await createUser(body)
    },

    async deleteUser(id: string)  {
        return await deleteUser(id)
    }
}