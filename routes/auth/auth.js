const ctrl = require('../controllers')
const router = require('express').Router()
const passport = require('passport')

router.get('/test', ctrl.user.test)
router.get('/doc', ctrl.user.doc)
router.post('/register', ctrl.user.register)
router.post('/login', ctrl.user.login)