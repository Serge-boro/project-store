require('dotenv').config()
const express = require('express')
const router = require('./router/storeRouter')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, './comfy-store/dist')))
app.use(express.json())
app.use(cors())

app.use('/store', router)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './comfy-store/dist', 'index.html'))
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

