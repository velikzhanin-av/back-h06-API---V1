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
            .put(SETTINGS.PATH.COMMENTS + '/670bcaa68efdeb20240672ef' + '/like-status')
            .send({"likeStatus": "None"})
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBjMDQyYzZmY2ZjZTA0YjBiYTE4OTkiLCJkZXZpY2VJZCI6IjNmMzJkYjRjLThlY2QtNGYyOC1hMDBhLTc1ZWU5YTYwMDQ0YiIsImlhdCI6MTcyODg0MDc1NSwiZXhwIjoxNzI4ODQ0MzU1fQ.cSA2njEYSE3qVhlbEHabKzh-ZUoGkr35oQ6JCUUbq5M')
            .expect(401)
        console.log(res.body);
    })

})