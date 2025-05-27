const express = require('express');
const router = express.Router();
const controllerMidia = require('../controller/midia/controllerMidia');

// POST: Inserir nova mídia
router.post(
    '',
    controllerMidia.postMidia
);

// DELETE: Excluir mídia
router.delete(
    '/:idMidia',
    controllerMidia.deleteMidia
);

// PUT: Atualizar mídia
router.put(
    '/:idMidia',
    controllerMidia.putMidia
);

// GET: Listar todas as mídias
router.get(
    '',
    controllerMidia.getSearchAllMidia
);

// GET: Buscar mídia por ID
router.get(
    '/:idMidia',
    controllerMidia.getSearchMidia
);

module.exports = router;
