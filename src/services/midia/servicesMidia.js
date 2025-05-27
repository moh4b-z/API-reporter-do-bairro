const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const midiaDAO = require("../../model/DAO/midia")

async function inserirMidia(midia, contentType) {
    try {
        if (contentType === "application/json") {
            if (TableCORRECTION.CHECK_tbl_midia(midia)) {
                const result = await midiaDAO.insertMidia(midia)

                if (result) {
                    return {
                        ...MENSAGE.SUCCESS_CEATED_ITEM,
                        midia: result
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

async function atualizarMidia(midia, idMidia, contentType) {
    try {
        if (contentType === "application/json") {
            if (TableCORRECTION.CHECK_tbl_midia(midia) && CORRECTION.CHECK_ID(idMidia)) {
                const busca = await buscarMidia(idMidia)

                if (busca.status_code === 201) {
                    midia.id = parseInt(idMidia)
                    const result = await midiaDAO.updateMidia(midia)

                    return result ? MENSAGE.SUCCESS_UPDATED_ITEM : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return busca
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

async function excluirMidia(idMidia) {
    try {
        if (CORRECTION.CHECK_ID(idMidia)) {
            const resultBusca = await midiaDAO.selectByIdMidia(parseInt(idMidia))

            if (resultBusca) {
                const result = await midiaDAO.deleteMidia(parseInt(idMidia))
                return result ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
            } else {
                return MENSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function listarTodasMidias() {
    try {
        const result = await midiaDAO.selectAllMidias()

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 201,
                items: result.length,
                midias: result
            }
        } else {
            return MENSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarMidia(idMidia) {
    try {
        if (CORRECTION.CHECK_ID(idMidia)) {
            const result = await midiaDAO.selectByIdMidia(parseInt(idMidia))

            if (result) {
                return {
                    status: true,
                    status_code: 201,
                    midia: result
                }
            } else {
                return MENSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

module.exports = {
    inserirMidia,
    atualizarMidia,
    excluirMidia,
    listarTodasMidias,
    buscarMidia
}
