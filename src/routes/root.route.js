const express = require('express')
const { root } = require('../controllers')
const router = express.Router()

/**
 * @openapi
 * /:
 *   get:
 *     summary: Health
 *     tags:
 *       - system
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/', root.health)
module.exports = router
