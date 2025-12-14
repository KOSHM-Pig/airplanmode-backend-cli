const jwt = require('jsonwebtoken')

function requireApiKey(req) {
  try {
    const header = req.headers || {}
    const key = header['x-api-key'] || header['X-API-KEY']
    return Boolean(key && key === process.env.API_KEY)
  } catch (_) {
    return false
  }
}

function verifyAdminToken(token) {
  try {
    if (!token) throw new Error('TOKEN_REQUIRED')
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET_MISSING')
    const payload = jwt.verify(token, secret)
    const permissions = payload.permissions || []
    const allowed = Array.isArray(permissions)
      ? permissions.includes('admin_verify')
      : permissions === 'admin_verify'
    if (!allowed) throw new Error('PERMISSION_DENIED')
    const adminId = payload.adminId || payload.sub || payload.id
    const email = payload.email || payload.mail
    return { adminId, email }
  } catch (err) {
    if (err && err.message === 'TOKEN_REQUIRED') throw err
    if (err && err.message === 'JWT_SECRET_MISSING') throw err
    if (err && err.message === 'PERMISSION_DENIED') throw err
    throw new Error('INVALID_TOKEN')
  }
}

module.exports = { requireApiKey, verifyAdminToken }
