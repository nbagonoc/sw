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
    it('GET api/files/:publicKey should download existing file', async () => {
        const res = await request(app)
                .get(`${path}c304a001-1ff5-4b12-9ed6-c2dd53d80672-pub`)
                .expect(200)
                expect(res.body.path).toBe("uploads/c304a001-1ff5-4b12-9ed6-c2dd53d80672-helloworld.jpeg")
    })
    it('GET api/files/:publickey should accept “publicKey” as a request parameter and return a response stream with a MIME type representing the actual file format.', async () => {
        const res = await request(app)
                .get(`${path}c304a001-1ff5-4b12-9ed6-c2dd53d80672-pub`)
                .expect(200)
                expect(res.body.mimeType).toBe("image/jpeg");
    })
})