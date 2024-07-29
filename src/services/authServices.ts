import {randomUUID} from "crypto"
// import add from "date-fns/add"

import {bcryptService} from "../utils/bcriptServices";
import {usersRepository} from "../repositories/users/usersRepository";
import {jwtServices} from "../utils/jwtServices";

export const authServices = {

     async login (body: any){
        const user: any = await usersRepository.findByLoginOrEmail(body.loginOrEmail)
        if (!user) {
            return false
        } else {
            if (await bcryptService.checkPassword(body.password, user.password)) {
                const token = await jwtServices.createJwt(user._id.toString())
                const result = await usersRepository.addJwtToken(user._id, token)
                if (!result) {
                    return false
                }
                return token
            } else {
                return false
            }

        }
    },

    async registerUser(login: string, password: string, email: string) {
        const result: any = {
            isExist: ''
        }
        result.isExist = await usersRepository.doesExistByLoginOrEmail(login, email)
        if (result.isExist) {
            return result
        }
        const passwordHash = await bcryptService.generateHash(password)
        const newUser =
            {
                login,
                password: passwordHash,
                email,
                createdAt: new Date().toISOString(),
                emailConfirmation: {    // доп поля необходимые для подтверждения
                    confirmationCode: randomUUID(),
                    // expirationDate: add(new Date(), {
                    //     hours: 1,
                    //     minutes: 30,
                    // }),
                    isConfirmed: false
                }
            }
        return await usersRepository.createUser(newUser)
    },

}
