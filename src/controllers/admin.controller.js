const { requireApiKey, verifyAdminToken } = require('../services/auth.service')

async function verify(req, res) {
  if (!requireApiKey(req)) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    return
  }
  const token = req.body && req.body.token
  if (!token) {
    res.status(400).json({ success: false, message: 'Missing token' })
    return
  }
  try {
    const { adminId, email } = verifyAdminToken(token)
    res.json({ success: true, message: 'OK', data: { adminId, email } })
  } catch (err) {
    const code = err.message === 'PERMISSION_DENIED' ? 401
      : err.message === 'TOKEN_REQUIRED' ? 400
      : 401
    const msg = err.message === 'JWT_SECRET_MISSING' ? 'Server config error'
      : err.message === 'PERMISSION_DENIED' ? 'Forbidden'
      : err.message === 'TOKEN_REQUIRED' ? 'Token required'
      : 'Invalid token'
    res.status(code).json({ success: false, message: msg })
  }
}

module.exports = { verify }

