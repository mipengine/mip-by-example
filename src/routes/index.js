const router = require('express').Router()

// register server router
router.use('/mip-form', require('./mip-form'))

module.exports = router
