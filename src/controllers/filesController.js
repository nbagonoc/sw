const fs = require('fs')
const dataPath = './src/datas/data.json'
const jsonReader = require('../helpers/jsonReader')
// get all the files
// const getAllFiles = (req, res) => {
//     return res.json({success:true})
// }

















// get single file
const getFile = (req, res) => {
    // console.log(req.params.publickey)
    // read data from JSON
    // console.log(req.params)
    jsonReader(dataPath, (err, data) => {
        if (err) throw err
        files = data
        pk = req.params.publicKey
        const searchObject = files.find((file) => file.publicKey == pk)
        // console.log(searchObject)
        return res.json({success:true,...searchObject})
    })
}





// create/upload file
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

    // ------------------------------- //
    // store data somewhere.
    // to use DB or not? might not. such an overkill.
    // ------------------------------- //
    // read data from JSON
    jsonReader(dataPath, (err, data) => {
        if (err) throw err
        // write data into JSON
        fs.writeFile(dataPath, JSON.stringify([postFile,...data], null, 2), err => {
            err ? console.log(err) : console.log('file success stored!')
        })
    })

    // console.log(file)
    // console.log({success:true,...postFile})
    return res.json({ success: true, ...postFile })
}














// delete file
// const deleteFile = (req, res) => {
//     return res.json({success:true})
// }

module.exports = {
    // getAllFiles,
    getFile,
    createFile,
    // namer
    // deleteFile,
}