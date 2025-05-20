const servicesUsuario = require("../../services/usuario/servicesUsuario")

async function postUsuario (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultUsuario = await servicesUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
}
async function getSearchAllUsuario(request, response) {
    let resultUsuario = await servicesUsuario.listarTodosUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
}

async function getSearchUsuario(request, response) {
    let idUsuario = request.params.idUsuario
    let resultUsuario = await servicesUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
}

async function deleteUsuario (request, response) {
    let idUsuario = request.params.idUsuario
    let resultUsuario = await servicesUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
}
async function putUsuario(request, response) {
    let idUsuario = request.params.idUsuario
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultUsuario = await servicesUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
}
async function putLoginUsuario(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultUsuario = await servicesUsuario.loginUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
}


module.exports = {
    postUsuario,
    putUsuario,
    deleteUsuario,
    getSearchAllUsuario,
    getSearchUsuario,
    putLoginUsuario
}