const swaggerJSDoc = require('swagger-jsdoc')

function createSwaggerSpec(serverUrl) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'AirplanMode Wechat Account Service',
        version: '1.0.0'
      },
      servers: [{ url: serverUrl }]
    },
    apis: ['src/**/*.js']
  }
  return swaggerJSDoc(options)
}

module.exports = { createSwaggerSpec }
