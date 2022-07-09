const fs = require('fs')

const jsonReader = (filePath, cb) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return cb && cb(err)
        try {
            const object = JSON.parse(data)
            return cb && cb(null, object);
        }
        catch (err) {
            return cb && cb(err)
        }
    })
}

module.exports = jsonReader;