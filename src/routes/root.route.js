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

/**
 * @openapi
 * /env:
 *   get:
 *     summary: Env
 *     tags:
 *       - system
 *     responses:
 *       '200':
 *         description: Environment values
 */
router.get('/env', root.env)

module.exports = router
