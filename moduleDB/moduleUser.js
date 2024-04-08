const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const SchemaUser = new Schema({
  user: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    default: true,
  },
})

SchemaUser.pre('save', async function () {
  if (!this.isModified('pwd')) return
  const salt = await bcrypt.genSalt(10)
  this.pwd = await bcrypt.hash(this.pwd, salt)
})

SchemaUser.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.pwd)
  return isMatch
}

const User = model('Users', SchemaUser)

module.exports = User
