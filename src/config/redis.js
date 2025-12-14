const { createClient } = require('redis')

function createRedisClient() {
  const url = process.env.REDIS_URL
  if (url) return createClient({ url })
  const host = process.env.REDIS_HOST || '127.0.0.1'
  const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379
  const password = process.env.REDIS_PASSWORD
  const db = process.env.REDIS_DB ? parseInt(process.env.REDIS_DB, 10) : undefined
  const auth = password ? `:${encodeURIComponent(password)}@` : ''
  const suffix = db !== undefined ? `/${db}` : ''
  const conn = `redis://${auth}${host}:${port}${suffix}`
  return createClient({ url: conn })
}

const redis = createRedisClient()

module.exports = { redis }

