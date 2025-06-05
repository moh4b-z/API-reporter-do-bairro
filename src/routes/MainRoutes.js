const express = require('express')
const router = express.Router()

const routesUsuario = require('./routesUsuario')
const routesNoticia = require('./routesNoticia')
const routesCategoria = require('./routesCategoria')
const routesMidia = require('./routesMidia')
const routesEndereco = require('./routesEndereco')
const routesStatus = require('./routesStatus')
const routesComentarios = require('./routesComentarios')



router.use('/comentario', routesComentarios)
router.use('/user', routesUsuario)
router.use('/noticia', routesNoticia)
router.use('/categoria', routesCategoria)
router.use('/midia', routesMidia)
router.use('/endereco', routesEndereco)
router.use('/status', routesStatus)

module.exports = router
