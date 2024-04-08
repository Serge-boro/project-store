const UserSchema = require('../moduleDB/moduleUser')

const getAllUsers = (req, res) => {
  res.send('All users')
}

const postRegister = async (req, res, next) => {
  const { user, pwd } = req.body

  try {
    if (!user && !pwd) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' })
    }

    const userFound = await UserSchema.findOne({ user })
    if (userFound) {
      return res.status(401).json({ message: `Username ${user} already exist` })
    }

    const createUser = await UserSchema.create({ user, pwd })

    res.status(201).json({ success: `New user ${user} created`, createUser })
  } catch (err) {
    next(err)
  }
}

const postLogin = async (req, res, next) => {
  const { user, pwd, credentialName, credentialPassword } = req.body

  try {
    if (
      !user &&
      !pwd &&
      credentialName === 'test' &&
      credentialPassword === 'test@test.com'
    ) {
      const user = 'guest'
      res.status(200).json({ user })
      return next()
    }

    if (!user || !pwd) {
      return res
        .status(400)
        .json({ message: 'Username and password are required.' })
    }

    const userFound = await UserSchema.findOne({ user })
    if (!userFound) {
      return res
        .status(401)
        .json({ message: `Username "${user}" does not exist` })
    }

    const comparePassword = await userFound.comparePassword(pwd)
    // console.log(comparePassword)
    if (!comparePassword) {
      return res.status(401).json({ message: `Password does not match` })
    }

    // const role = userFound.role
    // const accessToken = jwt.sign(
    //   { username: userFound.user, role },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: '10s' }
    // )
    // const refreshToken = jwt.sign(
    //   { username: userFound.user },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: '15s' }
    // )

    // console.log({ refreshToken, role })

    // userFound.refreshToken = refreshToken
    // await userFound.save()

    // res.cookie('jwt', refreshToken, {
    //   httpOnly: true,
    //   sameSite: 'None',
    //   secure: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // })

    // res.status(200).json({ accessToken, role })

    res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllUsers, postRegister, postLogin }
