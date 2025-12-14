const { auth } = require('../services')
const logger = require('../config/logger')

async function adminAuth(req, res, next) {
  try {
    const h = (req.headers && (req.headers.authorization || req.headers.Authorization)) || ''
    let token = null
    if (typeof h === 'string' && h.toLowerCase().startsWith('bearer ')) {
      token = h.slice(7).trim()
    } else if (req.body && typeof req.body.token === 'string') {
      token = req.body.token
    }
    if (!token) {
      return res.status(400).json({ success: false, message: '缺少令牌' })
    }
    const result = await auth.verifyAdmin(token)
    if (!result || result.success !== true || !result.data) {
      return res.status(401).json({ success: false, message: (result && result.message) || '令牌无效或未授权' })
    }
    req.admin = result.data
    next()
  } catch (e) {
    const status = e.status || 500
    const message = e.message || '验证失败'
    if (status >= 500) {
      logger.error('Admin auth error', { status, message })
    } else {
      logger.warn('Admin auth denied', { status, message })
    }
    res.status(status).json({ success: false, message })
  }
}

module.exports = adminAuth

