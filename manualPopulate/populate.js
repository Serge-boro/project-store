const mongoose = require('mongoose')

const Product = require('../moduleDB/moduleProducts')
const jsonProduct = require('./products.json')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const start = async () => {
  try {
    await connectDB(
      'mongodb+srv://SerhiiBorodin:W05w0SOgG8J4P3QR@cluster0.qmn1t.mongodb.net/Comfy_Store_Full_Project'
    )
    await Product.deleteMany()
    await Product.create(jsonProduct)
    console.log('SUCCESS!!!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()
