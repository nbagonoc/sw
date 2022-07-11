const fs = require('fs')
const dataPath = './src/datas/data.json'
const jsonReader = require('../helpers/jsonReader')

// ------------------------------- //
// UPLOAD - the fileupload code
// is in the middlewares dir
// you'll only see data manipulation
// here for the DB representation
// ------------------------------- //
const createFile = (req, res) => {
    // ------------------------------- //
    // add keys
    // I honestly don't get the idea the need of having 2 keys.
    // I'm assuming since there's no authentication
    //  there's no way for us to know which user has owndership of the files
    //  hence the 2 keys for public and private?
    // ------------------------------- //
    const file = req.file
    const fileName = file.filename
    const originalName = file.originalname
    const path = file.path
    const mimeType = file.mimetype
    const idKey = fileName.replace(originalName, "")
    const publicKey = `${idKey}pub`
    const privateKey = `${idKey}priv`
    const postFile = { publicKey, privateKey, path, originalName, mimeType }
    // read data from JSON
    jsonReader(dataPath, async (err, data) => {
        if (err) throw err
        // write data into JSON
        await fs.writeFile(dataPath, JSON.stringify([postFile, ...data], null, 2), err => {
            err ? console.log(err) : console.log('file success stored!')
        })
    })

    return res.json({ success: true, ...postFile })
}

// ------------------------------- //
// DOWNLOAD file using publicKey
// get filepath from JSON
// ------------------------------- //
const getFile = async (req, res) => {
    try {
        // wanted to use the dynamic pubkey in the test during POST to be dynamic
        // but having issues with fs and promises from data.JSON as DB (no idea. sometimes, it passes, sometimes it fails. Should have just used mongodDB isntead...)
        // had to rewrite this a couple of times (hence, the ugly code) instead of just using the helper file created
        // but for some reason, the dynamic test can't seem to return the (sometimes it passes,but  mostly, it fails).
        // even though i've alredy used promises on fs module. Is it because of the test script via supertest? no idea. Gave up the idea using dynamic id for the test
        // wasted a lot of hours here trying to make dynamic testing, sadly still ended up using mock data instead. oh well.
        const data = await fs.promises.readFile(dataPath, 'utf8')
        const files = JSON.parse(data)
        const pk = req.params.publicKey
        const getObject = files.find((file) => file.publicKey == pk)
        return res.json({success:true,...getObject})
    } catch (error) {
        console.log(error)
    }
}

// ------------------------------- //
// DELETE - using privateKey
// ------------------------------- //
const deleteFile = (req, res) => {
    jsonReader(dataPath, (err, data)=> {
        if (err) throw err
        let files = data
        const pk = req.params.privateKey
        const getObject = files.find((file) => file.privateKey == pk)
        const getObjectPath = getObject.path

        // remove file from directory
        fs.unlinkSync(`./${getObjectPath}`)
        // get updated object
        let newObject = files.filter(file => file.privateKey !== pk)
        // remove data from JSON
        fs.writeFile(dataPath, JSON.stringify(newObject, null, 2), err => {
            // err ? console.log(err) : console.log('file successfully removed!')
        })
        return res.json({success:true})
    })
}

module.exports = {
    getFile,
    createFile,
    deleteFile,
}