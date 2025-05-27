const express = require('express')
const router = express.Router()

const routesUsuario = require('./routesUsuario')
const routesNoticia = require('./routesNoticia')
const routesCategoria = require('./routesCategoria')
const routesMidia = require('./routesMidia') 
const routesMidiaNoticia = require('./routesMidiaNoticia.js');



router.use('/user', routesUsuario)
router.use('/noticia', routesNoticia)
router.use('/categoria', routesCategoria)
router.use('/midia', routesMidia)
router.use('/midia-noticia', routesMidiaNoticia)

module.exports = router
