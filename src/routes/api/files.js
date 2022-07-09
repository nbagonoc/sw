const express = require('express')
const router = express.Router()
const filesController = require('../../controllers/filesController')
const upload = require("../../middlewares/upload");


// router.get('/', filesController.getAllFiles) // GET | api/files | display all the files
router.get('/:publicKey', filesController.getFile) // GET | api/files/:publicKey | get a single file
router.post('/', upload.single('file'),filesController.createFile) // POST | api/files | creates an file
// router.delete('/:id', filesController.deleteFile) // DELETE | api/files/:privateKey | Delete a file

module.exports = router