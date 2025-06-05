const MENSAGE = require("../../../modulo/config")
const CORRECTION = require("../../../utils/inputCheck")
const TableCORRECTION = require("../../../utils/tablesCheck")

const comentarioDAO = require("../../../model/DAO/comentario") // Importa o DAO de comentários

// Inserir novo comentário
async function inserirComentario(comentario, contentType) {
    try {
        if (contentType === "application/json") {
            if (TableCORRECTION.CHECK_tbl_comentarios(comentario)) {
                const result = await comentarioDAO.insertComentario(comentario);

                if (result) {
                    return {
                        ...MENSAGE.SUCCESS_CEATED_ITEM,
                        comentario: result
                    };
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
        console.error("Erro ao inserir comentário:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

// Atualizar comentário
async function atualizarComentario(comentario, idComentario, contentType) {
    try {
        if (contentType === "application/json") {
            if (TableCORRECTION.CHECK_tbl_comentarios(comentario) && CORRECTION.CHECK_ID(idComentario)) {
                const busca = await buscarComentario(idComentario)

                if (busca.status_code === 200) {
                    comentario.id = parseInt(idComentario);
                    const result = await comentarioDAO.updateComentario(comentario)

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
        console.error("Erro ao atualizar comentário:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

// Excluir comentário
async function excluirComentario(idComentario) {
    try {
        if (CORRECTION.CHECK_ID(idComentario)) {
            const resultBusca = await comentarioDAO.selectByIdComentario(parseInt(idComentario))

            if (resultBusca) {
                const result = await comentarioDAO.deleteComentario(parseInt(idComentario))
                return result ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
            } else {
                return MENSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error("Erro ao excluir comentário:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

// Listar todos os comentários
async function listarTodosComentarios() {
    try {
        const result = await comentarioDAO.selectAllComentario()

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                comentarios: result
            };
        } else {
            return MENSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.error("Erro ao listar todos os comentários:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

// Buscar comentário por ID
async function buscarComentario(idComentario) {
    try {
        if (CORRECTION.CHECK_ID(idComentario)) {
            const result = await comentarioDAO.selectByIdComentario(parseInt(idComentario))

            if (result) {
                return {
                    status: true,
                    status_code: 200,
                    comentario: result
                };
            } else {
                return MENSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error("Erro ao buscar comentário:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

module.exports = {
    inserirComentario,
    atualizarComentario,
    excluirComentario,
    listarTodosComentarios,
    buscarComentario
};
