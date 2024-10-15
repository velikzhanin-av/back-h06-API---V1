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
            .put(SETTINGS.PATH.COMMENTS + '/670e0e46025438bdcf5149ad' + '/like-status')
            .send({"likeStatus": "None"})
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBlMTg3NTdhODA3ZjhiYTc1MzI5NmIiLCJkZXZpY2VJZCI6ImFjZjQ0MDFjLTYyMTctNGQ1YS04MWE2LTdkOWE2MTI1MjFlZCIsImlhdCI6MTcyODk5NjU5MiwiZXhwIjoxNzI4OTk4OTkyfQ.V4LZ5_6009rC2ioF5USXVoV6ao9_3vAe__CJBVnwBXg')
            .expect(204)
        console.log(res.body);
    })

})