const servicesEndereco = require("../../services/API/endereco/servicesEndereco"); // Importa o arquivo de serviços de endereço

// POST: Inserir novo endereço
async function postEndereco(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultEndereco = await servicesEndereco.inserirEndereco(dadosBody, contentType);

    response.status(resultEndereco.status_code);
    response.json(resultEndereco);
}

// GET: Listar todos os endereços
async function getSearchAllEnderecos(request, response) {
    let resultEnderecos = await servicesEndereco.listarTodosEnderecos();

    response.status(resultEnderecos.status_code);
    response.json(resultEnderecos);
}

// GET: Buscar endereço por ID
async function getSearchEndereco(request, response) {
    let idEndereco = request.params.idEndereco;
    let resultEndereco = await servicesEndereco.buscarEndereco(idEndereco);

    response.status(resultEndereco.status_code);
    response.json(resultEndereco);
}

// DELETE: Excluir endereço
async function deleteEndereco(request, response) {
    let idEndereco = request.params.idEndereco;
    let resultEndereco = await servicesEndereco.excluirEndereco(idEndereco);

    response.status(resultEndereco.status_code);
    response.json(resultEndereco);
}

// PUT: Atualizar endereço
async function putEndereco(request, response) {
    let idEndereco = request.params.idEndereco;
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultEndereco = await servicesEndereco.atualizarEndereco(dadosBody, idEndereco, contentType);

    response.status(resultEndereco.status_code);
    response.json(resultEndereco);
}

module.exports = {
    postEndereco,
    putEndereco,
    deleteEndereco,
    getSearchAllEnderecos,
    getSearchEndereco
};