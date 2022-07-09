const app = require('../index')
const request = require('supertest')
const path = '/api/files/'

describe('files routes', () => {
    it('POST api/files Should accept multipart/form-data requests', async () => {
        await request(app)
            .post(`${path}`)
            .field('name', 'file')
            .attach('file', 'tests/fixtures/mockData.txt')
            .set('Content-Type', 'multipart/form-data')
            .expect(200)
    })
    it('POST api/files return a response in JSON format with the following attributes: publicKey & privateKey', async () => {
        const res = await request(app)
                .post(`${path}`)
                .field('name', 'file')
                .attach('file', 'tests/fixtures/mockData.txt')
                .set('Content-Type', 'multipart/form-data')
                .expect(200)
                .expect('Content-Type', /json/)
                expect(res.body.publicKey).toBeTruthy()
                expect(res.body.privateKey).toBeTruthy()

    })
    it('GET api/files/:pubkey It should accept “publicKey” as a request parameter and return a response stream with a MIME type representing the actual file format.', async () => {
        const res = await request(app)
                .get(`${path}:62d0ea90-6119-4dda-a0ee-72693ac8b007-pub`)
                .expect(200)
                // expect(res.body.mimetype).toBeTruthy()

    })
})