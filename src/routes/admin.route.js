const express = require('express')
const { admin } = require('../controllers')
const router = express.Router()

router.post('/api/service/admin/verify', admin.verify)

module.exports = router

