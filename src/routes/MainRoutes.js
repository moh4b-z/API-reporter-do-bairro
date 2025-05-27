const express = require('express')
const router = express.Router()

const routesUsuario = require('./routesUsuario')
const routesNoticia = require('./routesNoticia') // Importa as rotas da tabela noticia

router.use('/user', routesUsuario)
router.use('/noticia', routesNoticia) // Adiciona a rota da tabela noticia

module.exports = router
