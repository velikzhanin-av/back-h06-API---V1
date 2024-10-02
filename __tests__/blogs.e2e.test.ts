import {req} from "./testHelpers";
import {SETTINGS} from "../src/settings";
import {db} from "../src/db/db";
import {connectToDB, userCollection} from "../src/db/mongoDb";


describe('E2E Tests', () => {

    beforeAll(async () => {
        await connectToDB();
        await userCollection.insertOne({
            login: "velik",
            password: "string",
            email: "a.velikzhanin90@gmail.com",
            createdAt: new Date().toString(),
            emailConfirmation: {
                confirmationCode: 'string',
                expirationDate: 'string',
                isConfirmed: false
            }
        })
        await userCollection.drop()
    });


    afterAll(async () => {
        await userCollection.drop();
    });


    describe('POST /registration', () => {
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
    });

    describe('POST /login', () => {
        it('success login', async () => {
            const dataBody = {
                loginOrEmail: "velik",
                password: "string",
            }

            const res = await req
                .post(SETTINGS.PATH.AUTH + '/login')
                .send(dataBody)
                .expect(200)

        })
    });



});
