const express = require('express')
const router = express.Router()
const controllerEndereco = require('../controller/endereco/controllerEndereco')

router.post(
    '',
    controllerEndereco.postEndereco
)
router.delete(
    '/:idUsuario',
    controllerEndereco.deleteEndereco
)
router.put(
    '/:idUsuario',
    controllerEndereco.putEndereco
)
router.get(
    '',
    controllerEndereco.getSearchAllEnderecos
)
router.get(
    '/:idUsuario',
    controllerEndereco.getSearchEndereco
)

module.exports = router