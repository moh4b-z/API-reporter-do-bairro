const servicesNoticia = require("../../services/API/noticia/servicesNoticia");

// POST: Inserir notícia
async function postNoticia(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultNoticia = await servicesNoticia.inserirNoticia(dadosBody, contentType);

    response.status(resultNoticia.status_code);
    response.json(resultNoticia);
}

// PUT: Atualizar notícia
async function putNoticia(request, response) {
    let idNoticia = request.params.idNoticia;
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultNoticia = await servicesNoticia.atualizarNoticia(dadosBody, idNoticia, contentType);

    response.status(resultNoticia.status_code);
    response.json(resultNoticia);
}

// DELETE: Excluir notícia
async function deleteNoticia(request, response) {
    let idNoticia = request.params.idNoticia;

    let resultNoticia = await servicesNoticia.excluirNoticia(idNoticia);

    response.status(resultNoticia.status_code);
    response.json(resultNoticia);
}

// GET: Buscar todas as notícias
async function getSearchAllNoticia(request, response) {
    let resultNoticia = await servicesNoticia.listarTodasNoticias();

    response.status(resultNoticia.status_code);
    response.json(resultNoticia);
}

// GET: Buscar notícia por ID
async function getSearchNoticia(request, response) {
    let idNoticia = request.params.idNoticia;

    let resultNoticia = await servicesNoticia.buscarNoticia(idNoticia);

    response.status(resultNoticia.status_code);
    response.json(resultNoticia);
}

// ✅ GET: Buscar todas as notícias por ID de usuário
async function getNoticiasPorUsuario(request, response) {
    let idUsuario = request.params.usuarioId;
    let resultNoticia = await servicesNoticia.buscarNoticiasPorUsuario(idUsuario);
    
    response.status(resultNoticia.status_code);
    response.json(resultNoticia);
  }
  
module.exports = {
    postNoticia,
    putNoticia,
    deleteNoticia,
    getSearchAllNoticia,
    getSearchNoticia,
    getNoticiasPorUsuario 
}
