const UserSchema = require('../moduleDB/moduleDB')

const getAllUsers = (req, res) => {
  res.send('All users')
}

const postRegister = async (req, res, next) => {
  const { email, password } = req.body

  try {
    if (!email && !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' })
    }

    const userFound = await UserSchema.findOne({ email })
    if (userFound) {
      return res
        .status(401)
        .json({ message: `Username ${email} already exist` })
    }

    const createUser = await UserSchema.create({ email, password })

    res.status(201).json({ success: `New user ${email} created`, createUser })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllUsers, postRegister }
