const { Router } = require('express')
const { getAllUsers, postRegister } = require('../controller/controller')

const router = Router()

router.route('/getAllUsers').get(getAllUsers)
router.route('/register').post(postRegister)

module.exports = router
