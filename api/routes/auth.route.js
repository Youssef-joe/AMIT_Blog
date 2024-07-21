const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/auth.controller.js')

router.post('/signup', authControllers.signUp)
router.post('/signin', authControllers.signIn)
router.post('/google', authControllers.google)

module.exports = router