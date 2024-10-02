import {connectToDB, sessionsCollection, userCollection} from "../src/db/mongoDb"
import {req} from "./testHelpers"
import {SETTINGS} from "../src/settings"

describe('E2E Tests', () => {

    let refreshToken: any
    let deviceId: string

    beforeAll(async () => {
        await connectToDB()
        await userCollection.drop()
    })


    afterAll(async () => {
        await userCollection.drop()
    })


    it('success registration', async () => {
        const dataBody = {
            "login": "velik",
            "password": "string",
            "email": "a.velikzhanin90@gmail.com"
        }

        const res = await req
            .post(SETTINGS.PATH.AUTH + '/registration')
            .send(dataBody)
            .expect(204)

    })

    it('success login', async () => {
        const dataBody = {
            loginOrEmail: "velik",
            password: "string",
        }

        const res = await req
            .post(SETTINGS.PATH.AUTH + '/login')
            .send(dataBody)

        expect(res.headers['set-cookie']).toBeDefined()
        const cookies = res.headers['set-cookie']
        if (!cookies || !Array.isArray(cookies)) {
            console.error('No cookies found or cookies are not an array')
            return
        }
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('')[0].split('=')
            if (name === 'refreshToken') {
                refreshToken = value
            }
        })
        expect(refreshToken).toBeDefined()
    })

    it('success get devices', async () => {
        const res = await req
            .get(SETTINGS.PATH.SECURITY + '/devices')
            .set('Cookie', [`refreshToken=${refreshToken}`])
            .expect(200)
        expect(res.body).toBeDefined()
        deviceId = res.body[res.body.length - 1].deviceId
    })

    it('success delete device by id', async () => {
        const res = await req
            .delete(SETTINGS.PATH.SECURITY + '/devices/' + deviceId)
            .set('Cookie', [`refreshToken=${refreshToken}`])
        expect(res.status).toBe(204)
    })

    it('POST auth/refresh-token should return new \'refresh\' and \'access\' tokens status 200', async () => {
        const res = await req
            .post(SETTINGS.PATH.AUTH + '/refresh-token')
            .set('Cookie', [`refreshToken=${refreshToken}`])
        expect(res.status).toBe(200)
    })
})