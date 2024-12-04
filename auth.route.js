const express = require(`express`)
const app = express()
app.use(express.json())
const {authenticate, authorize} = require(`../controllers/auth.cotroller.js`)

app.post(`/login`, authenticate)
module.exports = app