const express = require('express');
const router = express.Router();
const controllerEndereco = require('../controller/endereco/controllerEndereco');

// POST: Inserir novo endereço
router.post(
    '',
    controllerEndereco.inserirEndereco
);

// DELETE: Excluir endereço
router.delete(
    '/:idEndereco',
    controllerEndereco.excluirEndereco
);

// PUT: Atualizar endereço
router.put(
    '/:idEndereco',
    controllerEndereco.atualizarEndereco
);

// GET: Listar todos os endereços
router.get(
    '',
    controllerEndereco.listarTodosEnderecos
);

// GET: Buscar endereço por ID
router.get(
    '/:idEndereco',
    controllerEndereco.buscarEndereco
);

module.exports = router;
