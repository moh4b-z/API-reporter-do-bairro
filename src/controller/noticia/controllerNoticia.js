const servicesNoticia = require("../../services/noticia/servicesNoticia")

async function postNoticia(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultNoticia = await servicesNoticia.inserirNoticia(dadosBody, contentType)

    response.status(resultNoticia.status_code)
    response.json(resultNoticia)
}

async function getSearchAllNoticia(request, response) {
    let resultNoticia = await servicesNoticia.listarTodasNoticias()

    response.status(resultNoticia.status_code)
    response.json(resultNoticia)
}

async function getSearchNoticia(request, response) {
    let idNoticia = request.params.idNoticia
    let resultNoticia = await servicesNoticia.buscarNoticia(idNoticia)

    response.status(resultNoticia.status_code)
    response.json(resultNoticia)
}

async function deleteNoticia(request, response) {
    let idNoticia = request.params.idNoticia
    let resultNoticia = await servicesNoticia.excluirNoticia(idNoticia)

    response.status(resultNoticia.status_code)
    response.json(resultNoticia)
}

async function putNoticia(request, response) {
    let idNoticia = request.params.idNoticia
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultNoticia = await servicesNoticia.atualizarNoticia(dadosBody, idNoticia, contentType)

    response.status(resultNoticia.status_code)
    response.json(resultNoticia)
}

module.exports = {
    postNoticia,
    putNoticia,
    deleteNoticia,
    getSearchAllNoticia,
    getSearchNoticia
}
