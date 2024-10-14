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
            .put(SETTINGS.PATH.COMMENTS + '/670ce9db68561ffe78245dca' + '/like-status')
            .send({"likeStatus": "Like"})
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBkMjg3ZWZlN2FiNDAwY2IxOWYyZWIiLCJkZXZpY2VJZCI6IjA3MmFkMjIxLWExMTctNDYxZi04MTM1LTI4NWExYzg0ZjFlNiIsImlhdCI6MTcyODkxNjE2OSwiZXhwIjoxNzI4OTE4NTY5fQ.i9_WujIAOt30Gq3bmDcxJF8dNc2By-UrK3vcnBYeVfc')
            .expect(204)
        console.log(res.body);
    })

})