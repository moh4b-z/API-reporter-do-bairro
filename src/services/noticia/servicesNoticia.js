const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const noticiaDAO = require("../../model/DAO/noticia")

async function inserirNoticia(noticia, contentType) {
    try {
        if (contentType === "application/json") {
            if (TableCORRECTION.CHECK_tbl_noticia(noticia)) {
                let result = await noticiaDAO.insertNoticia(noticia)

                if (result) {
                    return {
                        ...MENSAGE.SUCCESS_CEATED_ITEM,
                        noticia: result
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

async function atualizarNoticia(noticia, idNoticia, contentType) {
    try {
        if (contentType === "application/json") {
            if (TableCORRECTION.CHECK_tbl_noticia(noticia) && CORRECTION.CHECK_ID(idNoticia)) {
                const busca = await buscarNoticia(idNoticia)

                if (busca.status_code === 201) {
                    noticia.id = parseInt(idNoticia)

                    let result = await noticiaDAO.updateNoticia(noticia)

                    return result
                        ? MENSAGE.SUCCESS_UPDATED_ITEM
                        : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return busca // retorna erro de não encontrado
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

async function excluirNoticia(idNoticia) {
    try {
        if (CORRECTION.CHECK_ID(idNoticia)) {
            let resultBusca = await noticiaDAO.selectByIdNoticia(parseInt(idNoticia))

            if (resultBusca) {
                let result = await noticiaDAO.deleteNoticia(parseInt(idNoticia))
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

async function listarTodasNoticias() {
    try {
        let result = await noticiaDAO.selectAllNoticias()

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 201,
                items: result.length,
                noticias: result
            }
        } else {
            return MENSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarNoticia(idNoticia) {
    try {
        if (CORRECTION.CHECK_ID(idNoticia)) {
            let result = await noticiaDAO.selectByIdNoticia(parseInt(idNoticia))

            if (result) {
                return {
                    status: true,
                    status_code: 201,
                    noticia: result
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
    inserirNoticia,
    excluirNoticia,
    listarTodasNoticias,
    buscarNoticia,
    atualizarNoticia
}
