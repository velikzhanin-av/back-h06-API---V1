import {randomUUID} from "crypto"
import {add} from "date-fns"

import {bcryptService} from "../utils/bcriptServices";
import {usersRepository} from "../repositories/users/usersRepository";
import {jwtServices} from "../utils/jwtServices";
import {nodemailerService} from "./nodemailerService";
import {authRepository} from "../repositories/authRepository";

export const authServices = {

    async login(data: {
        loginOrEmail: string,
        password: string,
        userAgent: string,
        ip: string,
    }) {
        const user: any = await usersRepository.findByLoginOrEmail(data.loginOrEmail)
        if (!user) {
            return false
        } else {
            if (await bcryptService.checkPassword(data.password, user.password)) {
                const userId = user._id.toString()
                const accessToken: string  = await jwtServices.createJwt(userId)
                const refreshToken: string = await jwtServices.createRefreshToken(userId)
                const tokenData = await jwtServices.getIatFromJwtToken(refreshToken)
                const iat = tokenData!.iat
                const exp = tokenData!.exp
                const resultAccessToken = await usersRepository.addJwtToken(user._id, accessToken )
                const resultRefreshToken = await usersRepository.addRefreshToken(user._id, refreshToken )
                if (!resultAccessToken || !resultRefreshToken) {
                    return false
                }
                const resultCreateSession = await authRepository.createSession({userId,
                sessionId: '',
                    iat,
                    exp,
                    ip: data.ip,
                    deviceName: data.userAgent
                })
                return {accessToken, refreshToken}
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
        if (!userInfo) {
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

    async refreshToken(token: string, user: any) {
        const isValidToken = await this.checkRefreshTokenInBlackList(token)
        if (isValidToken) return

        const addTokenToBlackList = await authRepository.addTokenToBlackList(token, user)
        if (!addTokenToBlackList) return

        const accessToken  = await jwtServices.createJwt(user)
        const refreshToken  = await jwtServices.createRefreshToken(user)
        const resultAccessToken = await usersRepository.addJwtToken(user._id, accessToken )
        const resultRefreshToken = await usersRepository.addRefreshToken(user._id, refreshToken )
        if (!accessToken || !refreshToken) return

        return {accessToken, refreshToken}
    },

    async checkRefreshTokenInBlackList(refreshToken: string) {
        return await authRepository.checkRefreshTokenInBlackList(refreshToken)
    },

    async logout(refreshToken: string, user: any) {
        const isValidToken = await this.checkRefreshTokenInBlackList(refreshToken)
        if (isValidToken) return

        const addTokenToBlackList = await authRepository.addTokenToBlackList(refreshToken, user._id)
        if (!addTokenToBlackList) return
        return true
    }

}
