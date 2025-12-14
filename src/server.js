require('dotenv').config()
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const { createSwaggerSpec } = require('./config/swagger')
const logger = require('./config/logger')
const routes = require('./routes')
const { sequelize } = require('./config/database')
const { redis } = require('./config/redis')

const app = express()
const port = process.env.PORT || 3000
const serverUrl = process.env.APPLICATION_URL || `http://localhost:${port}`

const swaggerSpec = createSwaggerSpec(serverUrl)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.json())

app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info'
    logger.log(level, `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`)
  })
  next()
})

app.use('/', routes)

app.use((err, req, res, next) => {
  logger.error('Unhandled error', { err: err.message })
  res.status(500).json({ error: 'Internal Server Error' })
})

async function start() {
  app.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port}`)
  })

  try {
    await sequelize.authenticate()
    logger.info('Database connected')
  } catch (err) {
    logger.error('Database connect failed', { err: err && (err.message || String(err)) })
  }

  try {
    await redis.connect()
    logger.info('Redis connected')
  } catch (err) {
    logger.error('Redis connect failed', { err: err && (err.message || String(err)) })
  }
}

start()
