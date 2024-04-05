const { Router } = require('express')
const {
  getAllUsers,
  postRegister,
  postLogin,
} = require('../controller/controller')

const router = Router()

router.route('/getAllUsers').get(getAllUsers)
router.route('/register').post(postRegister)
router.route('/login').post(postLogin)

module.exports = router
