import {randomUUID} from "crypto"
import {add} from "date-fns"

import {bcryptService} from "../utils/bcriptServices";
import {usersRepository} from "../repositories/users/usersRepository";
import {jwtServices} from "../utils/jwtServices";
import {nodemailerService} from "./nodemailerService";

export const authServices = {

    async login(body: any) {
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
            isExist: '',
            sendEmail: ''
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
                emailConfirmation: {
                    confirmationCode: randomUUID(),
                    expirationDate: add(new Date(), {
                        hours: 1,
                        minutes: 30,
                    }),
                    isConfirmed: false
                }
            }
        const createUser = await usersRepository.createUser(newUser)

        const sendEmail = await nodemailerService.sendEmail(login, email, newUser.emailConfirmation.confirmationCode)
        if (!sendEmail) {
            return result
        }
        result.sendEmail = true
        return result
    },

    async registrationEmailResending(email: string) {
        const result: any = {
            emailIsExist: true,
            emailIsConfirmed: false
        }
        const userInfo = await usersRepository.findByLoginOrEmail(email)
        console.log(userInfo);
        if (!userInfo) {
            console.log('юзера нет!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            result.emailIsExist = false
            return result
        }
        if (userInfo.emailConfirmation.isConfirmed) {
            result.emailIsConfirmed = true
            return result
        }
        const newConfirmationCode = randomUUID()
        const createConfirmationCode = await usersRepository.updateConfirmationCode(userInfo.email, newConfirmationCode)

        if (!await nodemailerService.sendEmail(userInfo.login, userInfo.email, newConfirmationCode)) {
            return false
        }
        return result
    },

    async registrationConfirmation(code: string) {
        const result: any = {
            codeIsExist: true,
            emailIsConfirmed: false
        }
        const userInfo = await usersRepository.findConfirmationCode(code)
        if (!userInfo) {
            result.codeIsExist = false
            return result
        }
        if (userInfo.emailConfirmation.isConfirmed) {
            result.emailIsConfirmed = true
            return result
        }
        if (!await usersRepository.updateIsConfirmed(userInfo.email)) {
            return false
        }
        return result


    },


}
