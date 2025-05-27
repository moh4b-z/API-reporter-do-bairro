const express = require('express')
const router = express.Router()
const controllerNoticia = require('../controller/noticia/controllerNoticia')

router.post(
    '',
    controllerNoticia.postNoticia
)
router.delete(
    '/:idNoticia',
    controllerNoticia.deleteNoticia
)
router.put(
    '/:idNoticia',
    controllerNoticia.putNoticia
)
router.get(
    '',
    controllerNoticia.getSearchAllNoticia
)
router.get(
    '/:idNoticia',
    controllerNoticia.getSearchNoticia
)

module.exports = router
