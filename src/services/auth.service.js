const jwt = require('jsonwebtoken')
const logger = require('../config/logger')

async function verifyAdmin(token) {
  if (!token || typeof token !== 'string') {
    const err = new Error('Invalid token')
    err.status = 400
    throw err
  }

  const apiKey = process.env['X-API_KEY']
  if (!apiKey) {
    const err = new Error('Missing X-API_KEY')
    err.status = 500
    throw err
  }

  const baseUrl = process.env.APPLICATION_URL
  if (!baseUrl) {
    const err = new Error('Missing APPLICATION_URL')
    err.status = 500
    throw err
  }

  const url = `${baseUrl}/api/service/admin/verify`

  const start = Date.now()
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-KEY': apiKey
    },
    body: JSON.stringify({ token })
  })
  const duration = Date.now() - start

  let payload
  try {
    payload = await res.json()
  } catch (e) {
    payload = null
  }

  if (!res.ok) {
    logger.warn('Admin verify failed', { status: res.status, duration })
    const message = (payload && payload.message) || `Request failed: ${res.status}`
    const err = new Error(message)
    err.status = res.status
    err.payload = payload
    throw err
  }

  logger.info('Admin verify success', { duration })
  return payload
}

function requireAdmin(req, res, next) {
  try {
    const auth = req.headers && req.headers['authorization']
    let token = null
    if (auth && typeof auth === 'string') {
      const parts = auth.split(' ')
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) token = parts[1]
    }
    if (!token && req.body && typeof req.body.token === 'string') token = req.body.token
    if (!token) return res.status(401).json({ success: false, message: '令牌无效或未授权' })
    verifyAdmin(token)
      .then(payload => {
        const data = payload && payload.data ? payload.data : null
        req.admin = data
        next()
      })
      .catch(err => {
        const code = err && err.status ? err.status : 401
        const message = (err && err.message) || '令牌无效或未授权'
        res.status(code).json({ success: false, message })
      })
  } catch (e) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

module.exports = { verifyAdmin, requireAdmin }
