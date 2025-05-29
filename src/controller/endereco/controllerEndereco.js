const enderecoService = require("../../services/endereco/servicesEndereco")

const inserirEndereco = async (req, res) => {
    let contentType = req.headers["content-type"]
    let dados = req.body

    let result = await enderecoService.inserirEndereco(dados, contentType)
    res.status(result.status_code).json(result)
}

const atualizarEndereco = async (req, res) => {
    let idEndereco = req.params.id
    let contentType = req.headers["content-type"]
    let dados = req.body

    let result = await enderecoService.atualizarEndereco(dados, idEndereco, contentType)
    res.status(result.status_code).json(result)
}

const excluirEndereco = async (req, res) => {
    let idEndereco = req.params.id

    let result = await enderecoService.excluirEndereco(idEndereco)
    res.status(result.status_code).json(result)
}

const listarTodosEnderecos = async (req, res) => {
    let result = await enderecoService.listarTodosEnderecos()
    res.status(result.status_code).json(result)
}

const buscarEndereco = async (req, res) => {
    let idEndereco = req.params.id

    let result = await enderecoService.buscarEndereco(idEndereco)
    res.status(result.status_code).json(result)
}

module.exports = {
    inserirEndereco,
    atualizarEndereco,
    excluirEndereco,
    listarTodosEnderecos,
    buscarEndereco
}
