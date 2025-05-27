const MENSAGE = require("../../modulo/config");
const CORRECTION = require("../../utils/inputCheck");
const TableCORRECTION = require("../../utils/tablesCheck");

const noticiaCategoriaDAO = require("../../model/DAO/noticiaCategoria");

// Inserir associação
async function inserirNoticiaCategoria(noticiaCategoria, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_noticia_categoria(noticiaCategoria)) {
                let result = await noticiaCategoriaDAO.insertNoticiaCategoria(noticiaCategoria);

                if (result) {
                    return {
                        ...MENSAGE.SUCCESS_CEATED_ITEM,
                        noticia_categoria: result
                    };
                } else {
                    return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                }
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS;
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

// Atualizar associação
async function atualizarNoticiaCategoria(noticiaCategoria, id, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_noticia_categoria(noticiaCategoria) && CORRECTION.CHECK_ID(id)) {
                let resultExistente = await buscarNoticiaCategoria(parseInt(id));

                if (resultExistente.status_code == 201) {
                    noticiaCategoria.id = parseInt(id);
                    let result = await noticiaCategoriaDAO.updateNoticiaCategoria(noticiaCategoria);
                    return result ? MENSAGE.SUCCESS_UPDATED_ITEM : MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                } else if (resultExistente.status_code == 404) {
                    return MENSAGE.ERROR_NOT_FOUND;
                } else {
                    return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
                }
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS;
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

// Excluir associação
async function excluirNoticiaCategoria(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let verificacao = await noticiaCategoriaDAO.selectByIdNoticiaCategoria(parseInt(id));

            if (verificacao && typeof verificacao === "object") {
                let result = await noticiaCategoriaDAO.deleteNoticiaCategoria(parseInt(id));
                return result ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE;
            } else {
                return MENSAGE.ERROR_NOT_FOUND;
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

// Listar todas as associações
async function listarTodasNoticiasCategorias() {
    try {
        let result = await noticiaCategoriaDAO.selectAllNoticiaCategoria();

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 201,
                items: result.length,
                noticias_categorias: result
            };
        } else {
            return MENSAGE.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

// Buscar por ID
async function buscarNoticiaCategoria(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let result = await noticiaCategoriaDAO.selectByIdNoticiaCategoria(parseInt(id));

            if (result && typeof result === "object") {
                return {
                    status: true,
                    status_code: 201,
                    noticia_categoria: result
                };
            } else {
                return MENSAGE.ERROR_NOT_FOUND;
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

module.exports = {
    inserirNoticiaCategoria,
    atualizarNoticiaCategoria,
    excluirNoticiaCategoria,
    listarTodasNoticiasCategorias,
    buscarNoticiaCategoria
};
