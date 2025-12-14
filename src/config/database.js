const { Sequelize } = require('sequelize')

function createSequelize() {
  const dialect = process.env.DB_DIALECT || 'mysql'
  const host = process.env.DB_HOST
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined
  const database = process.env.DB_NAME
  const username = process.env.DB_USER
  const password = process.env.DB_PASSWORD

  const options = { dialect, host }
  if (port) options.port = port
  return new Sequelize(database || '', username || '', password || '', options)
}

const sequelize = createSequelize()

module.exports = { sequelize }

