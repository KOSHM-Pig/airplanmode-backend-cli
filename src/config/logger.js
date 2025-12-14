const { createLogger, format, transports } = require('winston')

const level = process.env.LOG_LEVEL || 'info'

const logger = createLogger({
  level,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ level, message, timestamp, ...meta }) => {
          const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
          return `${timestamp} ${level}: ${message}${extra}`
        })
      )
    }),
    new transports.File({ filename: 'logs/app.log' }),
    new transports.File({ level: 'error', filename: 'logs/error.log' })
  ]
})

module.exports = logger

