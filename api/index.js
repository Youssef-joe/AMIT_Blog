const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT

const uri = process.env.MONGO_URI
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})

mongoose
.connect(uri)
.then(() => {console.log(`MongoDb is connected`)})
.catch((er)=> {console.log(er)})

