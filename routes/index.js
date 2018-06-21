const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', async function(req, res) {
  res.send('Sample Node Express Sequelize API')
})

module.exports = router
