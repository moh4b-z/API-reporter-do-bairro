const servicesMidia = require("../../services/API/midia/servicesMidia")

// POST: Inserir nova mídia
async function postMidia(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultMidia = await servicesMidia.inserirMidia(dadosBody, contentType)

    response.status(resultMidia.status_code)
    response.json(resultMidia)
}

// GET: Listar todas as mídias
async function getSearchAllMidia(request, response) {
    let resultMidia = await servicesMidia.listarTodasMidias()

    response.status(resultMidia.status_code)
    response.json(resultMidia)
}

// GET: Buscar mídia por ID
async function getSearchMidia(request, response) {
    let idMidia = request.params.idMidia
    let resultMidia = await servicesMidia.buscarMidia(idMidia)

    response.status(resultMidia.status_code)
    response.json(resultMidia)
}

// DELETE: Excluir mídia
async function deleteMidia(request, response) {
    let idMidia = request.params.idMidia
    let resultMidia = await servicesMidia.excluirMidia(idMidia)

    response.status(resultMidia.status_code)
    response.json(resultMidia)
}

// PUT: Atualizar mídia
async function putMidia(request, response) {
    let idMidia = request.params.idMidia
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultMidia = await servicesMidia.atualizarMidia(dadosBody, idMidia, contentType)

    response.status(resultMidia.status_code)
    response.json(resultMidia)
}

module.exports = {
    postMidia,
    putMidia,
    deleteMidia,
    getSearchAllMidia,
    getSearchMidia
}
