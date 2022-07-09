const config = require('../src/configs/config');

describe('configurations', () => {
    test('important .env vars should not be empty', () => {
        expect(config.PORT).toBeTruthy()
        expect(config.PROVIDER).toBeTruthy()
        expect(config.FOLDER).toBeTruthy()
        expect(config.GC_PATH).toBeTruthy()
        expect(config.GC_KEY).toBeTruthy()
    })
})