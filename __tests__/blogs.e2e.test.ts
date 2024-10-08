import {req} from "./testHelpers"
import {SETTINGS} from "../src/settings"
import mongoose from "mongoose";

describe('E2E Tests', () => {

    let refreshToken: any
    let deviceId: string

    beforeAll(async () => {
        await mongoose.connect(SETTINGS.MONGO_URL)
        // await userCollection.drop()
    })


    afterAll(async () => {
        // await userCollection.drop()
        await mongoose.connection.close()
    })


    it('create blog', async () => {
        const body = {
            "name": "string",
            "description": "string",
            "websiteUrl": "https://hx8t5t8Zs2JSfTZmmelIBSXZ1U4nPOVFEIvfdiS_9DhP-vzwC0q.VcXcKMY--K5k1gL_1Cg_aKrTTszphXghH8mE5dRN"
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send(body)
            .expect(201)
        console.log(res.body)
        console.log('!!!!!!!!!')
    })

    it('success get all blogs', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(200)
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

})