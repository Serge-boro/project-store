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
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL,
//   })
// )

const corsConfig = {
  origin: true,
  credentials: true,
}

app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

// app.use(
//   cors({
//     origin: '*',
//     credentials: true,
//   })
// )

app.use(cookieParser())

// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://localhost:3000')
//   next()
// })

// app.use(
//   cors({
//     origin: 'http://localhost:5173', // use your actual domain name (or localhost), using * is not recommended
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
//     allowedHeaders: [
//       'Content-Type',
//       'Origin',
//       'X-Requested-With',
//       'Accept',
//       'x-client-key',
//       'x-client-token',
//       'x-client-secret',
//       'Authorization',
//     ],
//     credentials: true,
//   })
// )

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
