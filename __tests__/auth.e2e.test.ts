// password-recovery
import {req} from "./testHelpers"
import {SETTINGS} from "../src/settings"
import mongoose from "mongoose";
import {connectToDB, userCollection} from "../src/db/mongoDb";

describe('Auth E2E Tests', () => {

    let refreshToken: any
    let deviceId: string

    beforeAll(async () => {
        await userCollection.drop()
        await mongoose.connect(SETTINGS.MONGO_URL)
        await connectToDB()
    })


    afterAll(async () => {
        await mongoose.connection.close()
    })

    it('success registration', async () => {
        const dataBody = {
            "login": "velik",
            "password": "string",
            "email": "example@gmail.com"
        }

        const res = await req
            .post(SETTINGS.PATH.AUTH + '/registration')
            .send(dataBody)
            .expect(204)
    })

    // it('success login', async () => {
    //     const dataBody = {
    //         loginOrEmail: "velik",
    //         password: "string",
    //     }
    //
    //     const res = await req
    //         .post(SETTINGS.PATH.AUTH + '/login')
    //         .send(dataBody)
    //
    //     expect(res.headers['set-cookie']).toBeDefined()
    //     const cookies = res.headers['set-cookie']
    //     if (!cookies || !Array.isArray(cookies)) {
    //         console.error('No cookies found or cookies are not an array')
    //         return
    //     }
    //     cookies.forEach(cookie => {
    //         const [name, value] = cookie.split(' ')[0].split('=')
    //         if (name === 'refreshToken') {
    //             refreshToken = value
    //         }
    //     })
    //     expect(refreshToken).toBeDefined()
    // })

    it('should send email with recovery code; status 204', async () => {
        const body = {
            "email": "a.velikzhanin90@gmail.com"
        }

        const res = await req
            .post(SETTINGS.PATH.AUTH + '/password-recovery')
            .send(body)
            .expect(204)
    })

    it('should send email with recovery code; status 204', async () => {
        const body = {
            "newPassword": "string123",
            "recoveryCode": "0d412e31-5a80-486f-ba57-746e36c63a2f"
        }

        const res = await req
            .post(SETTINGS.PATH.AUTH + '/new-password')
            .send(body)
            .expect(204)
    })


})