const express = require('express')
const router = express.Router()
const controllerUsuario = require('../controller/usuario/controllerUsuario')

router.post(
    '/',
    controllerUsuario.postUsuario
)
router.delete(
    '/:idUsuario',
    controllerUsuario.deleteUsuario
)
router.put(
    '/login',
    controllerUsuario.putLoginUsuario
)
router.put(
    '/:idUsuario',
    controllerUsuario.putUsuario
)
router.get(
    '/',
    controllerUsuario.getSearchAllUsuario
)
router.get(
    '/:idUsuario',
    controllerUsuario.getSearchUsuario
)

module.exports = router