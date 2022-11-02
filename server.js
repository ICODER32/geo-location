const express = require('express')
const path = require('path')
const connectDb = require('./config/dbConnect')
const cors = require('cors')
const dotenv = require('dotenv')

// EXPRESS APP
const app = express()

// load config variables
dotenv.config({ path: "./config/config.env" })
const PORT = process.env.PORT;

// body parser and cors middlewares
app.use(express.json())
app.use(cors())

// setup static folder

app.use(express.static(path.join(__dirname, 'public')))

// Routes 
app.use('/api/v1/stores', require('./routes/stores'))

connectDb()

// server start
app.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT}`))