const express = require('express');
const router = express.Router();
const controllerCategoria = require('../controller/categoria/controllerCategoria');

router.post(
    '',
    controllerCategoria.postCategoria
);

router.delete(
    '/:idCategoria',
    controllerCategoria.deleteCategoria
);

router.put(
    '/:idCategoria',
    controllerCategoria.putCategoria
);

router.get(
    '',
    controllerCategoria.getSearchAllCategoria
);

router.get(
    '/:idCategoria',
    controllerCategoria.getSearchCategoria
);

module.exports = router;
