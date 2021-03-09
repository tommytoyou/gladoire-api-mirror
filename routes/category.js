const ctrl = require('../controllers')
const router = require('express').Router()
const passport = require('passport')


router.get('/',passport.authenticate('jwt', {session: false}), ctrl.category.get_all)
router.put('/:id',passport.authenticate('jwt', {session: false}), ctrl.category.update)
router.post('/',passport.authenticate('jwt', {session: false}), ctrl.category.create)
router.delete('/:id',passport.authenticate('jwt', {session: false}), ctrl.category.delete)




module.exports = router