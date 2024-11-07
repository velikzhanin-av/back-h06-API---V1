import {req} from "./testHelpers"
import {SETTINGS} from "../src/settings"
import mongoose from "mongoose";
import {blogCollection, postCollection, userCollection} from "../src/db/mongoDb";

describe('E2E tests posts', () => {

    let accessToken: any
    let deviceId: string
    let blogId: string

    beforeAll(async () => {
        await mongoose.connect(SETTINGS.MONGO_URL)
        await userCollection.drop()
        await postCollection.drop()
        await blogCollection.drop()
    })


    afterAll(async () => {
        // await userCollection.drop()
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

    it('success login', async () => {
        const dataBody = {
            loginOrEmail: "velik",
            password: "string",
        }

        const res = await req
            .post(SETTINGS.PATH.AUTH + '/login')
            .send(dataBody)

        expect(res.body.accessToken).toBeDefined()
        accessToken = res.body.accessToken
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

        expect(res.body.id).toBeDefined()
        blogId = res.body.id
    })

    it('create post', async () => {
        const body = {
            "title": "string",
            "shortDescription": "string",
            "content": "string",
            "blogId": blogId
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send(body)
            .expect(201)

        expect(res.body).toEqual({
            blogId: expect.any(String),
            blogName: expect.any(String),
            content: expect.any(String),
            createdAt: expect.stringMatching(
                /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
            ),
            extendedLikesInfo: {
                dislikesCount: expect.any(Number),
                likesCount: expect.any(Number),
                myStatus: expect.stringMatching(/^Like$|^Dislike$|^None$/),
                newestLikes: expect.any(Array),
            },
            id: expect.any(String),
            shortDescription: expect.any(String),
            title: expect.any(String),
        })

        console.log(res.body)

    })


})