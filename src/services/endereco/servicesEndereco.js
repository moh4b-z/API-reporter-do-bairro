const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")
const enderecoDAO = require("../../model/DAO/endereco")

async function inserirEndereco(endereco, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_endereco(endereco)) {
                let result = await enderecoDAO.insertEndereco(endereco)

                if (result) {
                    return {
                        ...MENSAGE.SUCCESS_CEATED_ITEM,
                        endereco: result
                    }
                } else {
                    return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function atualizarEndereco(endereco, idEndereco, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_endereco(endereco) && CORRECTION.CHECK_ID(idEndereco)) {
                let enderecoExistente = await buscarEndereco(idEndereco)

                if (enderecoExistente.status_code === 201) {
                    endereco.id = parseInt(idEndereco)
                    let result = await enderecoDAO.updateEndereco(endereco)
                    return result ? MENSAGE.SUCCESS_UPDATED_ITEM : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return MENSAGE.ERROR_NOT_FOUND
                }
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function excluirEndereco(idEndereco) {
    try {
        if (CORRECTION.CHECK_ID(idEndereco)) {
            let enderecoExistente = await enderecoDAO.selectByIdEndereco(parseInt(idEndereco))

            if (enderecoExistente) {
                let result = await enderecoDAO.deleteEndereco(parseInt(idEndereco))
                return result ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
            } else {
                return MENSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function listarTodosEnderecos() {
    try {
        let result = await enderecoDAO.selectAllEndereco()

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 201,
                items: result.length,
                enderecos: result
            }
        } else {
            return MENSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarEndereco(idEndereco) {
    try {
        if (CORRECTION.CHECK_ID(idEndereco)) {
            let result = await enderecoDAO.selectByIdEndereco(parseInt(idEndereco))

            if (result) {
                return {
                    status: true,
                    status_code: 201,
                    endereco: result
                }
            } else {
                return MENSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

module.exports = {
    inserirEndereco,
    atualizarEndereco,
    excluirEndereco,
    listarTodosEnderecos,
    buscarEndereco
}
