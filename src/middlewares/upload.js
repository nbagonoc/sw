const multer = require('multer')
const uuid = require('uuid').v4
const folder = require("../configs/config").FOLDER

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./${folder}`)
    },
    filename: (req, file, cb) => {
        const { originalname } = file
        cb(null, `${uuid()}-${originalname}`)
    }
})

const upload = multer({ storage })

module.exports = upload
