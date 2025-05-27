const express = require('express')
const router = express.Router()

const routesUsuario = require('./routesUsuario')
const routesNoticia = require('./routesNoticia')
const routesCategoria = require('./routesCategoria')
const routesMidia = require('./routesMidia') 

router.use('/user', routesUsuario)
router.use('/noticia', routesNoticia)
router.use('/categoria', routesCategoria)
router.use('/midia', routesMidia)

module.exports = router
