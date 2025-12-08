require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('OK')
})

app.get('/env', (req, res) => {
  res.json({
    APPLICATION_URL: process.env.APPLICATION_URL || null
  })
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
