// INIT app
const express = require("express")
const app = express()

// MIDDLEWARES
const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// USE ROUTES
const files = require("./src/routes/api/files")
app.use("/api/files", files)

// SET PORT
const port = require("./src/configs/config").PORT
app.listen(port, () => console.log(`we are live at ${port}`))

app.use(express.static('public'))

// TESTING
// const fs = require('fs')
// const dataPath = './src/datas/data.json'
// fs.readFile(dataPath, 'utf-8', (err, data) => {
//     console.log(data)
// })

module.exports = app