const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/auth.controller.js')

router.post('/signup', authControllers.signUp)

module.exports = router