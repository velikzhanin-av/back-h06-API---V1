import {req} from "./testHelpers";
import {SETTINGS} from "../src/settings";
import {db} from "../src/db/db";


describe(  'DELETE /testing/all-data', () => {
    it('return code status 204', async () => {
        const res = await req
            .delete('/')
            .expect(204)
    })
});
//
// describe('GET /videos', () => {
//     it('return all videos and code status 200', async () => {
//         db.videos = [{title: 'title any video'}]
//
//         const res = await req
//             .get(SETTINGS.PATH.VIDEOS)
//             .expect(200)
//
//         expect(res.body.length).toBe(1)
//     })
// });
//
// describe('POST /videos', () => {
//     it('return added video json and code status 201', async () => {
//         const body = {
//             "title": "string",
//             "author": "string",
//             "availableResolutions": [
//                 "P144"
//             ]
//         }
//         const createdAt = new Date()
//         const publicationDate = new Date()
//         publicationDate.setDate(publicationDate.getDate() + 1)
//         const newVideo = {
//             "id": 0,
//             "title": body.title,
//             "author": body.author,
//             "canBeDownloaded": false,
//             "minAgeRestriction": null,
//             "createdAt": createdAt.toISOString(),
//             "publicationDate": publicationDate.toISOString(),
//             "availableResolutions": body.availableResolutions
//         }
//         db.videos.push(newVideo)
//
//         const res = await req
//             .post(SETTINGS.PATH.VIDEOS)
//             .send(body)
//
//         expect(res.status).toBe(201)
//         expect({title:res.body.title, author:res.body.author, availableResolutions: res.body.availableResolutions})
//             .toMatchObject({title: body.title, author:body.author, availableResolutions:body.availableResolutions})
//     })
// });
//
// describe('GET /videos/{id}', () => {
//     it('return video by id and code status 200', async () => {
//         const newVideo = {
//             "id": 2,
//             "title": "title test",
//             "author": "author test",
//             "canBeDownloaded": false,
//             "minAgeRestriction": null,
//             "createdAt": new Date().toISOString(),
//             "publicationDate": new Date().toISOString(),
//             "availableResolutions": [
//                 "P144",
//                 "P480",
//             ]
//         }
//         db.videos.push(newVideo)
//
//         const res = await req
//             .get(`${SETTINGS.PATH.VIDEOS}/2`)
//             .expect(200)
//
//         expect(res.body.length).toBe(1)
//     })
// });

// describe('PUT /videos/{id}', () => {
//     it('no content 204', async () => {
//         db.videos.push({
//             "id": 0,
//             "title": "some title",
//             "author": "some author",
//             "canBeDownloaded": false,
//             "minAgeRestriction": null,
//             "createdAt": "2024-03-17T18:18:37.941Z",
//             "publicationDate": "2024-03-18T18:18:37.941Z",
//             "availableResolutions": [
//                 "P144"
//             ]
//         })
//
//         const body = {
//             "title": "valid title",
//             "author": "valid author",
//             "availableResolutions": [
//                 "P144"
//             ],
//             "canBeDownloaded": true,
//             "minAgeRestriction": 18,
//             "publicationDate": "2024-03-17T08:27:37.909Z"
//         }
//
//         const res = await req
//             .put(`${SETTINGS.PATH.VIDEOS}/0`)
//             .send(body)
//
//         expect(res.status).toBe(204)
//     })
// });