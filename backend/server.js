const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.MLAB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('mongodb database connection established successfully')
})

const exercisesRoutes = require('./routes/exercise.route')
const userRoutes = require('./routes/user.route')

app.use('/exercises', exercisesRoutes)
app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
