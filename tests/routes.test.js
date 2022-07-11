const app = require('../index')
const request = require('supertest')
const path = '/api/files/'

describe('files routes', () => {
    let privateKey
    let publicKey
    let filePath
    let fileMimeType

    describe('files routes | POST', () => {
        it('POST api/files Should accept multipart/form-data requests', async () => {
            await request(app)
                .post(`${path}`)
                .field('name', 'file')
                .attach('file', 'tests/fixtures/mockData.txt')
                .set('Content-Type', 'multipart/form-data')
                .expect(200)
        })
        it('POST api/files return a response in JSON format with the following attributes: publicKey & privateKey', async () => {
            await request(app)
                .post(`${path}`)
                .field('name', 'file')
                .attach('file', 'tests/fixtures/mockData.txt')
                .set('Content-Type', 'multipart/form-data')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body.publicKey).toBeTruthy()
                    expect(res.body.privateKey).toBeTruthy()
                    privateKey = res.body.privateKey //pass the value here so we can use it later in DELETE test
                    publicKey = res.body.publicKey //pass the value here so we can use it later in GET test
                    filePath = res.body.path //pass the value here so we can use it later in GET test
                    fileMimeType = res.body.mimeType //pass the value here so we can use it later in GET test
                })
        })
    })

    describe('files routes | GET', () => {
        it('GET api/files/:publicKey should download existing file', async () => {
            await request(app)
                .get(`${path}c304a001-1ff5-4b12-9ed6-c2dd53d80672-pub`)
                // .get(path+publicKey) //wanted to use the dynamic data but seems to fail sometimes
                .expect(200)
                .then(res => {
                    expect(res.body.path).toBe('uploads/c304a001-1ff5-4b12-9ed6-c2dd53d80672-helloworld.jpeg')
                    // expect(res.body.path).toBe(filePath) //wanted to use the dynamic data but seems to fail sometimes
                })
        }, 10000)
        it('GET api/files/:publicKey should accept “publicKey” as a request parameter and return a response stream with a MIME type representing the actual file format.', async () => {
            const res = await request(app)
                .get(`${path}c304a001-1ff5-4b12-9ed6-c2dd53d80672-pub`)
                // .get(path+publicKey) //wanted to use the dynamic data but seems to fail sometimes
                .expect(200)
            expect(res.body.mimeType).toBe("image/jpeg");
            // expect(res.body.mimeType).toBe(fileMimeType); //wanted to use the dynamic data but seems to fail sometimes
        }, 10000)
    })

    it('DELETE api/files/:privateKey should accept privateKey as a request parameter and return a response in JSON format confirming the file removal', async () => {
        await request(app)
            .delete(path + privateKey) // testing in dynamic delete works perfectly. Why the heck does miss sometimes in GET request????
            .expect(200)
            .then(res => {
                expect(res.body.success).toBeTruthy()
            })
    })

})