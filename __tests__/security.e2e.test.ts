import {connectToDB, sessionsCollection, userCollection} from "../src/db/mongoDb"
import {req} from "./testHelpers"
import {SETTINGS} from "../src/settings"
import mongoose from "mongoose";

describe('E2E Tests', () => {

    let refreshToken: any
    let deviceId: string
    let userId: string

    beforeAll(async () => {
        // await connectToDB()
        await mongoose.connect(SETTINGS.MONGO_URL)
    })


    afterAll(async () => {
        // await userCollection.drop()
        await mongoose.connection.close()
    })


    it('success registration', async () => {
        const dataBody = {
            "login": "velik1",
            "password": "string",
            "email": "example@gmail.com"
        }

        const res = await req
            .post(SETTINGS.PATH.AUTH + '/registration')
            .send(dataBody)
            .expect(204)

    })

    it('get users', async () => {
        const res = await req
            .get(SETTINGS.PATH.USERS)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(200)

        userId = res.body.items[0].id
        console.log(userId);
    })

    it('delete user by id', async () => {
        const res = await req
            .delete(SETTINGS.PATH.USERS + '/' + userId)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')

        expect(res.status).toBe(200)
        console.log(res.body);
    })

    // it('get user by id', async () => {
    //     const res = await req
    //         .delete(SETTINGS.PATH.USERS + '/' + userId)
    //         .set('Cookie', [`refreshToken=${refreshToken}`])
    //     expect(res.status).toBe(204)
    // })

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

    // it('success get devices', async () => {
    //     const res = await req
    //         .get(SETTINGS.PATH.SECURITY + '/devices')
    //         .set('Cookie', [`refreshToken=${refreshToken}`])
    //         .expect(200)
    //     expect(res.body).toBeDefined()
    //     deviceId = res.body[res.body.length - 1].deviceId
    // })

    // it('success delete device by id', async () => {
    //     const res = await req
    //         .delete(SETTINGS.PATH.SECURITY + '/devices/' + deviceId)
    //         .set('Cookie', [`refreshToken=${refreshToken}`])
    //     expect(res.status).toBe(204)
    // })

    // it('success delete except current', async () => {
    //     const res = await req
    //         .delete(SETTINGS.PATH.SECURITY + '/devices/')
    //         .set('Cookie', [`refreshToken=${refreshToken}`])
    //     expect(res.status).toBe(204)
    // })
    // //
    // it('success get devices', async () => {
    //     const res = await req
    //         .get(SETTINGS.PATH.SECURITY + '/devices')
    //         .set('Cookie', [`refreshToken=${refreshToken}`])
    //         .expect(200)
    //     expect(res.body).toBeDefined()
    //     deviceId = res.body[res.body.length - 1].deviceId
    // })
    //
    // it('POST auth/refresh-token should return new \'refresh\' and \'access\' tokens status 200', async () => {
    //     const res = await req
    //         .post(SETTINGS.PATH.AUTH + '/refresh-token')
    //         .set('Cookie', [`refreshToken=${refreshToken}`])
    //     expect(res.status).toBe(200)
    // })
})