const express = require('express')
const router = express.Router()
const controllerComentario = require('../controller/comentario/controllerComentario')

router.post(
    '',
    controllerComentario.postComentario
)

router.delete(
    '/:idComentario',
    controllerComentario.deleteComentario
)

router.put(
    '/:idComentario',
    controllerComentario.putComentario
)

router.get(
    '',
    controllerComentario.getSearchAllComentarios
)

router.get(
    '/:idComentario',
    controllerComentario.getSearchComentario
)
router.get(
    '/:idNoticia',
    controllerComentario.getSearchComentarioOfNoticia
)

module.exports = router
