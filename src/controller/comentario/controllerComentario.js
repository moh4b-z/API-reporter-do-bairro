const servicesComentarios = require("../../services/API/comentarios/servicesComentarios") // Importa o arquivo de serviços de comentários

// POST: Inserir novo comentário
async function postComentario(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultComentario = await servicesComentarios.inserirComentario(dadosBody, contentType);

    response.status(resultComentario.status_code)
    response.json(resultComentario)
}

// GET: Listar todos os comentários
async function getSearchAllComentarios(request, response) {
    let resultComentarios = await servicesComentarios.listarTodosComentarios()

    response.status(resultComentarios.status_code)
    response.json(resultComentarios)
}

// GET: Buscar comentário por ID
async function getSearchComentario(request, response) {
    let idComentario = request.params.idComentario;
    let resultComentario = await servicesComentarios.buscarComentario(idComentario)

    response.status(resultComentario.status_code)
    response.json(resultComentario)
}

// GET: Buscar comentário por ID da noticia
async function getSearchComentarioOfNoticia(request, response) {
    let idNoticia = request.params.idNoticia
    let resultComentario = await servicesComentarios.buscarComentario(idNoticia)

    response.status(resultComentario.status_code)
    response.json(resultComentario)
}

// DELETE: Excluir comentário
async function deleteComentario(request, response) {
    let idComentario = request.params.idComentario;
    let resultComentario = await servicesComentarios.excluirComentario(idComentario)

    response.status(resultComentario.status_code)
    response.json(resultComentario)
}

// PUT: Atualizar comentário
async function putComentario(request, response) {
    let idComentario = request.params.idComentario
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultComentario = await servicesComentarios.atualizarComentario(dadosBody, idComentario, contentType)

    response.status(resultComentario.status_code)
    response.json(resultComentario)
}

module.exports = {
    postComentario,
    putComentario,
    deleteComentario,
    getSearchAllComentarios,
    getSearchComentario,
    getSearchComentarioOfNoticia
};
