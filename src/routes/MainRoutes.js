const express = require('express')
const router = express.Router()

const routesUsuario = require('./routesUsuario')

router.use('/user', routesUsuario)


module.exports = router