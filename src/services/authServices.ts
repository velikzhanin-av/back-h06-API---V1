import {randomUUID} from "crypto"
import {add} from "date-fns"
import {bcryptService} from "../utils/bcriptServices";
import {usersRepository} from "../repositories/users/usersRepository";
import {jwtServices} from "../utils/jwtServices";
import {nodemailerService} from "./nodemailerService";
import {authRepository} from "../repositories/authRepository";
import {securityRepository} from "../repositories/security/securityRepository";
import {StatusCodeHttp} from "../types/resultCode";
import {UserDbType} from "../types/dbTypes";

export const authServices = {

    async login(data: {
        loginOrEmail: string,
        password: string,
        userAgent: string,
        ip: string
    }) {
        const user: any = await usersRepository.findByLoginOrEmail(data.loginOrEmail)
        if (!user) {
            return false
        } else {
            if (await bcryptService.checkPassword(data.password, user.password)) {
                const userId = user._id.toString()
                const deviceId = randomUUID()

                const tokens:  {accessToken: string, refreshToken: string, tokenData: {iat: Date, exp: Date, deviceId: string}} | undefined = await this.createAccessAndRefreshTokens(user._id.toString(), deviceId)
                if (!tokens) return

                const iat: Date = tokens.tokenData.iat
                const exp: Date = tokens.tokenData.exp
                const resultAccessToken = await usersRepository.addJwtToken(user._id, tokens.accessToken )
                const resultRefreshToken = await usersRepository.addRefreshToken(user._id, tokens.refreshToken )
                if (!resultAccessToken || !resultRefreshToken) return false
                const resultCreateSession = await authRepository.createSession({userId,
                    deviceId,
                    iat,
                    exp,
                    ip: data.ip,
                    deviceName: data.userAgent
                })
                if (resultCreateSession) {
                    return {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, sessionId: resultCreateSession.insertedId.toString(), deviceId}
                } else return false
            } else return false

        }
    },

    async registerUser(login: string, password: string, email: string) {

        const loginOrEmail = await usersRepository.doesExistByLoginOrEmail(login, email)
        if (loginOrEmail) return {
            statusCode: StatusCodeHttp.BadRequest,
            data: loginOrEmail
        }

        const passwordHash = await bcryptService.generateHash(password)
        const newUser: UserDbType =
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
                    }).toString(),
                    isConfirmed: false
                }
            }
        const createUser = await usersRepository.createUser(newUser)

        const sendEmail = nodemailerService.sendEmail(login, email, newUser.emailConfirmation.confirmationCode)
        if (!sendEmail) return {
            statusCode: StatusCodeHttp.BadRequest,
            data: 'Email not send'
        }

        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
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

        if (!nodemailerService.sendEmail(userInfo.login, userInfo.email, newConfirmationCode)) {
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

    async refreshToken(tokenData: {iat: Date, exp: Date, deviceId: string}, user: any) {

        const session = await securityRepository.findSessionByIatAndDeviceId(tokenData.iat, tokenData.deviceId)
        if (!session) return

        const tokens:  {accessToken: string, refreshToken: string, tokenData: {iat: Date, exp: Date, deviceId: string}} | undefined = await this.createAccessAndRefreshTokens(user._id.toString(), tokenData.deviceId)
        if (!tokens) return

        const updateIat: number = await securityRepository.updateIat(session._id, tokens.tokenData.iat, tokens.tokenData.exp)
        if (!updateIat) return

        const resultAccessToken = await usersRepository.addJwtToken(user._id, tokens.accessToken )
        const resultRefreshToken = await usersRepository.addRefreshToken(user._id, tokens.refreshToken )
        if (!tokens.accessToken || !tokens.refreshToken) return

        return {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken}
    },

    async logout(deviceId: string) {
        const resultDelete = await securityRepository.deleteSessionByDeviceId(deviceId)
        if (!resultDelete) return {
            statusCode: StatusCodeHttp.Unauthorized,
            data: null
        }
        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
    },

    async createAccessAndRefreshTokens(userId: string, deviceId: string) {
        const accessToken: string  = await jwtServices.createJwt(userId, deviceId)
        const refreshToken: string  = await jwtServices.createRefreshToken(userId, deviceId)

        const tokenData: {
            iat: Date,
            exp: Date,
            deviceId: string
        } | undefined = await jwtServices.getDataFromJwtToken(refreshToken)
        if (!tokenData) return
        return {accessToken, refreshToken, tokenData}
    },

    async passwordRecovery(email: string) {
        const userInfo = await usersRepository.findByEmail(email)
        if (!userInfo) {
            return {
                statusCode: StatusCodeHttp.NoContent,
                data: null
            }
        }

        const recoveryCode = randomUUID()
        const expirationDate = add(new Date(), {
            minutes: 10,
        }).toString()
        const updateRecoveryCode = await usersRepository.updateRecoveryCode(userInfo.email, recoveryCode, expirationDate)

        if (!nodemailerService.sendEmailRecoveryPassword(userInfo.login, userInfo.email, recoveryCode)) {
            return {
                statusCode: StatusCodeHttp.InternalServerError,
                data: null
            }
        }
        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }

    },

    async newPassword(recoveryCode: string, newPassword: string) {
        const userInfo = await usersRepository.findByRecoveryCode(recoveryCode)
        if (!userInfo) return {
            statusCode: StatusCodeHttp.BadRequest,
            data: { errorsMessages: [{ message: "Code validation failure", field: "recoveryCode" }] }
        }

        const passwordHash: string = await bcryptService.generateHash(newPassword)
        const resultUpdatePassword = await usersRepository.updatePasswordHash(userInfo._id, passwordHash)
        if (!resultUpdatePassword) return {
            statusCode: StatusCodeHttp.InternalServerError,
            data: null
        }
        return {
            statusCode: StatusCodeHttp.NoContent,
            data: null
        }
    },
}
