import {SETTINGS} from "../src/settings";
import mongoose from "mongoose";
import {req} from "./testHelpers";
import {connectToDB} from "../src/db/mongoDb";

describe('E2E Tests', () => {

    let refreshToken: any
    let deviceId: string

    beforeAll(async () => {
        await mongoose.connect(SETTINGS.MONGO_URL)
        await connectToDB()
        // await userCollection.drop()
    })


    afterAll(async () => {
        // await userCollection.drop()
        await mongoose.connection.close()
    })

    it('Success put like status', async () => {
        const res = await req
            .put(SETTINGS.PATH.COMMENTS + '/671a59c52287c699a96f5e90' + '/like-status')
            .send({"likeStatus": "Dislike"})
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFhNjJlZTJlYTk2ZTIzOWFkYWMxYTkiLCJkZXZpY2VJZCI6ImI4MmFkMzIwLTdmOWYtNGM2ZC1hZGZmLTBiYjcxOTUxODEwZSIsImlhdCI6MTcyOTc4MjUxMiwiZXhwIjoxNzI5Nzg0OTEyfQ.KlemsU8lmyZ_iz90unwGlxTuzy4SZBl9Wj8VJjd8TIg')
            .expect(204)
    })

    it('Success get comment by id', async () => {
        const res = await req
            .get(SETTINGS.PATH.COMMENTS + '/671a59c52287c699a96f5e90')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFhNjJlZTJlYTk2ZTIzOWFkYWMxYTkiLCJkZXZpY2VJZCI6ImI4MmFkMzIwLTdmOWYtNGM2ZC1hZGZmLTBiYjcxOTUxODEwZSIsImlhdCI6MTcyOTc4MjUxMiwiZXhwIjoxNzI5Nzg0OTEyfQ.KlemsU8lmyZ_iz90unwGlxTuzy4SZBl9Wj8VJjd8TIg')
            .expect(200)
        console.log(res.body);
    })



})