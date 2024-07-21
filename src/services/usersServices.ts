import {usersRepository} from "../repositories/users/usersRepository";
import {bcryptService} from "../utils/bcriptServices";


export const usersServices = {
    async createUser(body: any)  {
        const passwordHash = await bcryptService.generateHash(body.password)
        const newUser =
            {
                login: body.login,
                password: passwordHash,
                email: body.email,
                createdAt: new Date().toISOString()
            }
        return await usersRepository.createUser(newUser)
    },

    async deleteUser(id: string)  {
        return await usersRepository.deleteUser(id)
    }
}