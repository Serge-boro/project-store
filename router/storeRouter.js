const { Router } = require('express')
const {
  getAllUsers,
  postRegister,
  postLogin,
  refreshTokenController,
  logout,
} = require('../controller/controllerAuth')

const verifyJWT = require('../JWT/VerifyJWT')

const {
  getProductsData,
  getSingleProductsData,
} = require('../controller/controllerProducts')

const router = Router()

router.route('/getAllUsers').get(getAllUsers)
router.route('/register').post(postRegister)
router.route('/login').post(postLogin)
router.route('/refresh').get(refreshTokenController)
router.route('/logout').get(logout)

router.route('/products').get(getProductsData)
router.route('/products/:id').get(verifyJWT, getSingleProductsData)

module.exports = router
