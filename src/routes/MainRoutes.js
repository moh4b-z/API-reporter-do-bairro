const express = require('express')
const router = express.Router()

const routesUsuario = require('./routesUsuario')
const routesNoticia = require('./routesNoticia') // Importa as rotas da tabela noticia
const routesCategoria = require('./routesCategoria')// Importa as rotas da tabela categoria

router.use('/user', routesUsuario)
router.use('/noticia', routesNoticia) // Adiciona a rota da tabela noticia
router.use('/categoria', routesCategoria) // Adiciona a rota da tabela categoria

module.exports = router
