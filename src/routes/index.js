const express = require('express')
const rootRouter = require('./root.route')
const adminRouter = require('./admin.route')

const router = express.Router()

router.use('/', rootRouter)
router.use('/', adminRouter)

module.exports = router
