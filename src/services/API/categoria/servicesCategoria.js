const MENSAGE = require("../../../modulo/config");
const CORRECTION = require("../../../utils/inputCheck");
const TableCORRECTION = require("../../../utils/tablesCheck");

const categoriaDAO = require("../../../model/DAO/categoria");

async function inserirCategoria(categoria, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_categoria(categoria)) {
                let resultCategoria = await categoriaDAO.insertCategoria(categoria);

                if (resultCategoria) {
                    return {
                        ...MENSAGE.SUCCESS_CEATED_ITEM,
                        categoria: resultCategoria
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

async function atualizarCategoria(categoria, idCategoria, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_categoria(categoria) && CORRECTION.CHECK_ID(idCategoria)) {
                let resultCategoria = await buscarCategoria(parseInt(idCategoria));

                
                if (resultCategoria.status_code == 201) {
                    categoria.id = parseInt(idCategoria);

                    let result = await categoriaDAO.updateCategoria(categoria);

                    return result ? MENSAGE.SUCCESS_UPDATED_ITEM : MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                } else if (resultCategoria.status_code == 404) {
                    console.log(resultCategoria)
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

async function excluirCategoria(idCategoria) {
    try {
        if (CORRECTION.CHECK_ID(idCategoria)) {
            let verification = await categoriaDAO.selectByIdCategoria(parseInt(idCategoria));

            if (verification != false || typeof (verification) == 'object') {
                if (verification) {
                    let resultCategoria = await categoriaDAO.deleteCategoria(parseInt(idCategoria));
                    return resultCategoria ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE;
                } else {
                    return MENSAGE.ERROR_NOT_FOUND;
                }
            } else {
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function listarTodasCategorias() {
    try {
        let resultCategoria = await categoriaDAO.selectAllCategoria();

        if (resultCategoria != false || typeof (resultCategoria) == 'object') {
            if (resultCategoria.length > 0) {
                return {
                    status: true,
                    status_code: 201,
                    items: resultCategoria.length,
                    categorias: resultCategoria
                };
            } else {
                return MENSAGE.ERROR_NOT_FOUND;
            }
        } else {
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function buscarCategoria(idCategoria) {
    try {
        if (CORRECTION.CHECK_ID(idCategoria)) {
            let resultCategoria = await categoriaDAO.selectByIdCategoria(parseInt(idCategoria));
            console.log(resultCategoria)
            if (resultCategoria != false || typeof (resultCategoria) == 'object') {
                if (resultCategoria) {
                    return {
                        status: true,
                        status_code: 201,
                        categoria: resultCategoria
                    };
                } else {
                    return MENSAGE.ERROR_NOT_FOUND;
                }
            } else {
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

module.exports = {
    inserirCategoria,
    atualizarCategoria,
    excluirCategoria,
    listarTodasCategorias,
    buscarCategoria
};
