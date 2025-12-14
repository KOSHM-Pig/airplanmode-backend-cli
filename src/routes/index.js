const express = require('express')
const rootRouter = require('./root.route')
const router = express.Router()

router.use('/', rootRouter)

module.exports = router
