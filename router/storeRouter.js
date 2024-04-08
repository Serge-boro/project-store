const { Router } = require('express')
const {
  getAllUsers,
  postRegister,
  postLogin,
} = require('../controller/controllerAuth')

const {
  getProductsData,
  getSingleProductsData,
} = require('../controller/controllerProducts')

const router = Router()

router.route('/getAllUsers').get(getAllUsers)
router.route('/register').post(postRegister)
router.route('/login').post(postLogin)

router.route('/products').get(getProductsData)
router.route('/products/:id').get(getSingleProductsData)

module.exports = router
