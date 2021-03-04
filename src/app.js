if(process.env.NODE_ENV !== 'production')
    require('dotenv').config()
const express = require("express")
const cors = require('cors')
const routes = require('../routes/routes')
const mongoose = require('mongoose')

const bodyparser = require('body-parser')

const app = express()
app.use(bodyparser.urlencoded({extended: false}))

app.use(cors())
app.use(express.json())
app.use(routes)

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('DB is now connected'))

app.listen(process.env.PORT, () => {
    console.log("server is running...")
})