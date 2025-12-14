const logger = require('../config/logger')

/**
 * 控制器：健康检查
 * API：GET /
 * 说明：返回服务运行状态
 */
async function health(req, res) {
  logger.info('API GET / invoked', { controller: 'root.health' })
  res.send('OK')
}

/**
 * 控制器：环境变量查询
 * API：GET /env
 * 说明：返回关键环境变量（非敏感）
 */
async function env(req, res) {
  logger.info('API GET /env invoked', { controller: 'root.env' })
  res.json({ APPLICATION_URL: process.env.APPLICATION_URL || null })
}

module.exports = { health, env }
