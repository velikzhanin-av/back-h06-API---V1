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
            .put(SETTINGS.PATH.COMMENTS + '/671a4fdba386453d4aa22fc2' + '/like-status')
            .send({"likeStatus": "Dislike"})
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFhNTBjZmU1NTEzZDRlOGFmY2U0NGMiLCJkZXZpY2VJZCI6IjIxMTQ5NDBlLWMwZDItNDc3MS1hMDJiLTA4Y2E3N2RhZTk0YSIsImlhdCI6MTcyOTc3Nzg3NCwiZXhwIjoxNzI5NzgwMjc0fQ.ibBHcBdCXbBPFKbVeuBfrCAF_miNw_dtRLbHfoKNwc0')
            .expect(204)
        console.log(res.body);
    })

})