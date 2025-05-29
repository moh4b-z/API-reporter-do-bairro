const MENSAGE = require("../../modulo/config");
const CORRECTION = require("../../utils/inputCheck");
const TableCORRECTION = require("../../utils/tablesCheck");

const enderecoDAO = require("../../model/DAO/endereco"); // Importa o DAO de endereço

async function inserirEndereco(endereco, contentType) {
    try {
        if (contentType === "application/json") {
            // Verifica os dados do endereço usando a função de correção específica para tbl_endereco
            if (TableCORRECTION.CHECK_tbl_endereco(endereco)) {
                const result = await enderecoDAO.insertEndereco(endereco);

                if (result) {
                    return {
                        ...MENSAGE.SUCCESS_CEATED_ITEM,
                        endereco: result
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
        console.error("Erro ao inserir endereço:", error); // Use console.error para erros
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function atualizarEndereco(endereco, idEndereco, contentType) {
    try {
        if (contentType === "application/json") {
            // Verifica os dados do endereço e o ID usando as funções de correção
            if (TableCORRECTION.CHECK_tbl_endereco(endereco) && CORRECTION.CHECK_ID(idEndereco)) {
                const busca = await buscarEndereco(idEndereco);

                if (busca.status_code === 200) { // O status_code para sucesso em buscar é 200
                    endereco.id = parseInt(idEndereco);
                    const result = await enderecoDAO.updateEndereco(endereco);

                    return result ? MENSAGE.SUCCESS_UPDATED_ITEM : MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                } else {
                    return busca; // Retorna a mensagem de erro da busca
                }
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS;
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function excluirEndereco(idEndereco) {
    try {
        if (CORRECTION.CHECK_ID(idEndereco)) {
            const resultBusca = await enderecoDAO.selectByIdEndereco(parseInt(idEndereco));

            if (resultBusca) {
                const result = await enderecoDAO.deleteEndereco(parseInt(idEndereco));
                return result ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE;
            } else {
                return MENSAGE.ERROR_NOT_FOUND;
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        console.error("Erro ao excluir endereço:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function listarTodosEnderecos() {
    try {
        const result = await enderecoDAO.selectAllEnderecos();

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200, // Alterado para 200 para sucesso em listagem
                items: result.length,
                enderecos: result
            };
        } else {
            return MENSAGE.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error("Erro ao listar todos os endereços:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function buscarEndereco(idEndereco) {
    try {
        if (CORRECTION.CHECK_ID(idEndereco)) {
            const result = await enderecoDAO.selectByIdEndereco(parseInt(idEndereco));

            if (result) {
                return {
                    status: true,
                    status_code: 200, // Alterado para 200 para sucesso em busca por ID
                    endereco: result
                };
            } else {
                return MENSAGE.ERROR_NOT_FOUND;
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

module.exports = {
    inserirEndereco,
    atualizarEndereco,
    excluirEndereco,
    listarTodosEnderecos,
    buscarEndereco
};