const servicesCategoria = require("../../services/API/categoria/servicesCategoria");

async function postCategoria(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultCategoria = await servicesCategoria.inserirCategoria(dadosBody, contentType);

    response.status(resultCategoria.status_code);
    response.json(resultCategoria);
}

async function getSearchAllCategoria(request, response) {
    let resultCategoria = await servicesCategoria.listarTodasCategorias();

    response.status(resultCategoria.status_code);
    response.json(resultCategoria);
}

async function getSearchCategoria(request, response) {
    let idCategoria = request.params.idCategoria;
    let resultCategoria = await servicesCategoria.buscarCategoria(idCategoria);

    response.status(resultCategoria.status_code);
    response.json(resultCategoria);
}

async function deleteCategoria(request, response) {
    let idCategoria = request.params.idCategoria;
    let resultCategoria = await servicesCategoria.excluirCategoria(idCategoria);

    response.status(resultCategoria.status_code);
    response.json(resultCategoria);
}

async function putCategoria(request, response) {
    let idCategoria = request.params.idCategoria;
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultCategoria = await servicesCategoria.atualizarCategoria(dadosBody, idCategoria, contentType);

    response.status(resultCategoria.status_code);
    response.json(resultCategoria);
}

module.exports = {
    postCategoria,
    putCategoria,
    deleteCategoria,
    getSearchAllCategoria,
    getSearchCategoria
};
