const ctrl = require('../controllers')
const router = require('express').Router()
const passport = require('passport')


router.post('/',passport.authenticate('jwt', {session: false}),  ctrl.journal.create_full)
router.post('/create_mini',passport.authenticate('jwt', {session: false}), ctrl.journal.create_post)
router.put('/',passport.authenticate('jwt', {session: false}), ctrl.journal.update)
router.get('/all',passport.authenticate('jwt', {session: false}), ctrl.journal.list_all)
router.get('/:id',passport.authenticate('jwt', {session: false}), ctrl.journal.get_one)
router.delete('/', passport.authenticate('jwt', {session: false}), ctrl.journal.delete_item)



module.exports = router