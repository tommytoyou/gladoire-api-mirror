const ctrl = require('../controllers')
const router = require('express').Router()
const passport = require('passport')

router.get('/test', ctrl.user.test)
router.get('/profile', ctrl.user.profile)
router.put('/profile', ctrl.user.updateProfile)
router.get('/doc', ctrl.user.doc)
router.post('/register', ctrl.user.register)
router.post('/login', ctrl.user.login)


module.exports = router