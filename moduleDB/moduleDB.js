const { Schema, model } = require('mongoose')

const SchemaUser = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: true,
  },
})

const User = model('Users', SchemaUser)

module.exports = User
