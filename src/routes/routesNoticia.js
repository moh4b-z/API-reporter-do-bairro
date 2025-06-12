const express = require('express')
const router = express.Router()
const controllerNoticia = require('../controller/noticia/controllerNoticia')

// Criar nova notícia
router.post('', controllerNoticia.postNoticia)

// Deletar notícia por ID
router.delete('/:idNoticia', controllerNoticia.deleteNoticia)

// Atualizar notícia por ID
router.put('/:idNoticia', controllerNoticia.putNoticia)

// Listar todas as notícias
router.get('', controllerNoticia.getSearchAllNoticia)

// Buscar notícia por ID
router.get('/:idNoticia', controllerNoticia.getSearchNoticia)

// Listar notícias por usuário (novo endpoint) 
router.get('/usuario/:usuarioId', controllerNoticia.getNoticiasPorUsuario)

module.exports = router
