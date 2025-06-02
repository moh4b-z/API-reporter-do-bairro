const express = require('express')
const router = express.Router()
const controllerStatus = require('../controller/controllerStatus')

router.get(
    '',
    controllerStatus.getTeste
)

module.exports = router
