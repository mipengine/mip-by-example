const router = require('express').Router()

router.get('/submit-form-success', (req, res) => {
  res.send('OK!')
})

module.exports = router
