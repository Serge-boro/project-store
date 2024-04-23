require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./router/storeRouter')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express()

app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.json())

// const origin = 'https://front-backend-project.netlify.app'
// const origin = 'http://localhost:5173'

app.use(
  cors({
    // credentials: true,
    // origin: process.env.ORIGIN,
    origin: 'https://front-backend-project.netlify.app',
    methods: ['GET', 'POST'],
  })
)

// const corsConfig = {
//   origin: true,
//   credentials: true,
// }

// app.use(cors(corsConfig))
// app.options('*', cors(corsConfig))

app.use(cookieParser())

app.use('/store', router)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await mongoose.connect(
      process.env.ConnectionMongoDB,
      console.log('Connecting to mongoDB ...')
    )
    await app.listen(PORT, console.log(`Listening ${PORT} port ...`))
  } catch (err) {
    console.log(err)
  }
}

start()
