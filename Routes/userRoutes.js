const express = require('express')
const { loginController, registerController } = require('../Controllers/userController')

//router object

const router = express.Router()

//routers
//POST || login user

router.post('/login',loginController)

//POST || REGISTER USER

router.post('/register',registerController)
module.exports = router