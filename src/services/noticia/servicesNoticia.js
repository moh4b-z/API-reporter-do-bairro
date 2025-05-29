const MENSAGE = require("../../modulo/config");
const CORRECTION = require("../../utils/inputCheck");
const TableCORRECTION = require("../../utils/tablesCheck");

const noticiaDAO = require("../../model/DAO/noticia");
const enderecoDAO = require("../../model/DAO/endereco"); // Importa o DAO de endereço
const midiaDAO = require("../../model/DAO/midia"); // Importa o DAO de mídia

async function inserirNoticia(noticia, contentType) {
    try {
        if (contentType === "application/json") {
            // Desestrutura a notícia para separar o endereço e as URLs das mídias
            const { titulo, conteudo, tbl_usuario_id, endereco, urls_midia } = noticia;

            // Validação básica para campos essenciais da notícia
            if (!titulo || !conteudo || !tbl_usuario_id || !endereco || !urls_midia || urls_midia.length === 0) {
                return MENSAGE.ERROR_REQUIRED_FIELDS;
            }

            // 1. Inserir o endereço
            // Assumimos que CHECK_tbl_endereco verifica os campos necessários do objeto 'endereco'
            if (!TableCORRECTION.CHECK_tbl_endereco(endereco)) {
                return { ...MENSAGE.ERROR_REQUIRED_FIELDS, message: "Dados de endereço incompletos ou inválidos." };
            }
            const novoEndereco = await enderecoDAO.insertEndereco(endereco);

            if (!novoEndereco) {
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
            }

            // 2. Inserir a notícia com a FK do endereço
            const noticiaParaInserir = {
                titulo: titulo,
                conteudo: conteudo,
                tbl_usuario_id: tbl_usuario_id,
                tbl_endereco_id: novoEndereco.id // Usa o ID do endereço recém-criado
            };

            const resultNoticia = await noticiaDAO.insertNoticia(noticiaParaInserir);

            if (!resultNoticia) {
                // Se a notícia não for inserida, pode ser interessante reverter a inserção do endereço
                await enderecoDAO.deleteEndereco(novoEndereco.id);
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
            }

            // 3. Inserir as mídias associadas à notícia
            const midiasInseridas = [];
            for (const url of urls_midia) {
                const midiaParaInserir = {
                    url: url,
                    tbl_noticia_id: resultNoticia.id // Associa a mídia à notícia recém-criada
                };
                // Assumimos que CHECK_tbl_midia verifica o campo 'url'
                if (!TableCORRECTION.CHECK_tbl_midia(midiaParaInserir)) {
                    // Logar o erro mas continuar, ou retornar um erro e reverter tudo? Depende da regra de negócio.
                    // Por simplicidade, vamos apenas logar e pular essa mídia inválida.
                    console.warn(`URL de mídia inválida: ${url}`);
                    continue;
                }
                const novaMidia = await midiaDAO.insertMidia(midiaParaInserir);
                if (novaMidia) {
                    midiasInseridas.push(novaMidia);
                } else {
                    console.error(`Falha ao inserir mídia com URL: ${url}`);
                }
            }

            // Montar o objeto de retorno completo da notícia com endereço e mídias
            const noticiaCompleta = {
                ...resultNoticia,
                endereco: novoEndereco,
                midias: midiasInseridas
            };

            return {
                ...MENSAGE.SUCCESS_CEATED_ITEM,
                noticia: noticiaCompleta
            };

        } else {
            return MENSAGE.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.error("Erro ao inserir notícia:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function atualizarNoticia(noticia, idNoticia, contentType) {
    try {
        if (contentType === "application/json") {
            const { titulo, conteudo, tbl_usuario_id, endereco, urls_midia } = noticia;

            if (!CORRECTION.CHECK_ID(idNoticia)) {
                return MENSAGE.ERROR_REQUIRED_FIELDS;
            }

            const buscaNoticia = await noticiaDAO.selectByIdNoticia(parseInt(idNoticia));

            if (!buscaNoticia) {
                return MENSAGE.ERROR_NOT_FOUND;
            }

            let idEnderecoExistente = buscaNoticia.tbl_endereco_id;
            let novoEnderecoAtualizado;

            // 1. Atualizar ou criar o endereço
            if (endereco) {
                if (!TableCORRECTION.CHECK_tbl_endereco(endereco)) {
                    return { ...MENSAGE.ERROR_REQUIRED_FIELDS, message: "Dados de endereço incompletos ou inválidos para atualização." };
                }

                if (idEnderecoExistente) {
                    // Atualiza o endereço existente
                    endereco.id = idEnderecoExistente;
                    const resultUpdateEndereco = await enderecoDAO.updateEndereco(endereco);
                    if (!resultUpdateEndereco) {
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                    }
                    novoEnderecoAtualizado = await enderecoDAO.selectByIdEndereco(idEnderecoExistente); // Busca o endereço atualizado para retorno
                } else {
                    // Cria um novo endereço se não houver um associado
                    const resultInsertEndereco = await enderecoDAO.insertEndereco(endereco);
                    if (!resultInsertEndereco) {
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                    }
                    idEnderecoExistente = resultInsertEndereco.id;
                    novoEnderecoAtualizado = resultInsertEndereco;
                }
            } else if (idEnderecoExistente) {
                // Se não foi passado um endereço e um endereço existente está associado, podemos optar por deletá-lo ou mantê-lo
                // Por padrão, se não for fornecido, manteremos o existente. Se a intenção é deletar, o front-end deve enviar um sinal para isso.
                novoEnderecoAtualizado = await enderecoDAO.selectByIdEndereco(idEnderecoExistente);
            }


            // 2. Atualizar a notícia
            const noticiaParaAtualizar = {
                id: parseInt(idNoticia),
                titulo: titulo || buscaNoticia.titulo,
                conteudo: conteudo || buscaNoticia.conteudo,
                tbl_usuario_id: tbl_usuario_id || buscaNoticia.tbl_usuario_id,
                tbl_endereco_id: idEnderecoExistente // Garante que a FK do endereço esteja atualizada
            };
            const resultNoticia = await noticiaDAO.updateNoticia(noticiaParaAtualizar);

            if (!resultNoticia) {
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
            }

            // 3. Atualizar as mídias associadas à notícia
            // Primeiro, deleta as mídias existentes para a notícia
            const midiasAntigas = await midiaDAO.selectMidiasByNoticiaId(parseInt(idNoticia)); // Você precisará criar essa função no seu DAO de mídia
            if (midiasAntigas && midiasAntigas.length > 0) {
                for (const midiaAntiga of midiasAntigas) {
                    await midiaDAO.deleteMidia(midiaAntiga.id);
                }
            }

            // Em seguida, insere as novas mídias
            const midiasAtualizadas = [];
            if (urls_midia && urls_midia.length > 0) {
                for (const url of urls_midia) {
                    const midiaParaInserir = {
                        url: url,
                        tbl_noticia_id: parseInt(idNoticia)
                    };
                    if (!TableCORRECTION.CHECK_tbl_midia(midiaParaInserir)) {
                        console.warn(`URL de mídia inválida durante atualização: ${url}`);
                        continue;
                    }
                    const novaMidia = await midiaDAO.insertMidia(midiaParaInserir);
                    if (novaMidia) {
                        midiasAtualizadas.push(novaMidia);
                    } else {
                        console.error(`Falha ao inserir mídia com URL durante atualização: ${url}`);
                    }
                }
            }

            const noticiaCompletaAtualizada = {
                ...resultNoticia,
                endereco: novoEnderecoAtualizado,
                midias: midiasAtualizadas
            };

            return {
                ...MENSAGE.SUCCESS_UPDATED_ITEM,
                noticia: noticiaCompletaAtualizada
            };
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.error("Erro ao atualizar notícia:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function excluirNoticia(idNoticia) {
    try {
        if (CORRECTION.CHECK_ID(idNoticia)) {
            const noticiaParaDeletar = await noticiaDAO.selectByIdNoticia(parseInt(idNoticia));

            if (!noticiaParaDeletar) {
                return MENSAGE.ERROR_NOT_FOUND;
            }

            // Deletar as mídias associadas à notícia
            const midiasAssociadas = await midiaDAO.selectMidiasByNoticiaId(parseInt(idNoticia)); // Crie essa função no seu DAO de mídia
            if (midiasAssociadas && midiasAssociadas.length > 0) {
                for (const midia of midiasAssociadas) {
                    await midiaDAO.deleteMidia(midia.id);
                }
            }

            // Deletar a notícia
            const result = await noticiaDAO.deleteNoticia(parseInt(idNoticia));

            if (result) {
                // Opcional: Deletar o endereço se não houver outras notícias associadas a ele.
                // Isso exigiria uma verificação mais complexa. Por simplicidade, vamos manter o endereço por enquanto.
                // const outrasNoticiasComMesmoEndereco = await noticiaDAO.selectNoticiasByEnderecoId(noticiaParaDeletar.tbl_endereco_id);
                // if (!outrasNoticiasComMesmoEndereco || outrasNoticiasComMesmoEndereco.length === 0) {
                //     await enderecoDAO.deleteEndereco(noticiaParaDeletar.tbl_endereco_id);
                // }
                return MENSAGE.SUCCESS_DELETE_ITEM;
            } else {
                return MENSAGE.ERROR_NOT_DELETE;
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        console.error("Erro ao excluir notícia:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function listarTodasNoticias() {
    try {
        const resultNoticias = await noticiaDAO.selectAllNoticias();

        if (resultNoticias && resultNoticias.length > 0) {
            const noticiasComDetalhes = [];
            for (const noticia of resultNoticias) {
                const endereco = await enderecoDAO.selectByIdEndereco(noticia.tbl_endereco_id);
                const midias = await midiaDAO.selectMidiasByNoticiaId(noticia.id); // Crie essa função no seu DAO de mídia

                noticiasComDetalhes.push({
                    ...noticia,
                    endereco: endereco || null,
                    midias: midias || []
                });
            }

            return {
                status: true,
                status_code: 200, // Alterado para 200 para listar todos
                items: noticiasComDetalhes.length,
                noticias: noticiasComDetalhes
            };
        } else {
            return MENSAGE.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error("Erro ao listar todas as notícias:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

async function buscarNoticia(idNoticia) {
    try {
        if (CORRECTION.CHECK_ID(idNoticia)) {
            const resultNoticia = await noticiaDAO.selectByIdNoticia(parseInt(idNoticia));

            if (resultNoticia) {
                const endereco = await enderecoDAO.selectByIdEndereco(resultNoticia.tbl_endereco_id);
                const midias = await midiaDAO.selectMidiasByNoticiaId(resultNoticia.id); // Crie essa função no seu DAO de mídia

                const noticiaDetalhada = {
                    ...resultNoticia,
                    endereco: endereco || null,
                    midias: midias || []
                };

                return {
                    status: true,
                    status_code: 200, // Alterado para 200 para buscar por ID
                    noticia: noticiaDetalhada
                };
            } else {
                return MENSAGE.ERROR_NOT_FOUND;
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        console.error("Erro ao buscar notícia:", error);
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES;
    }
}

module.exports = {
    inserirNoticia,
    atualizarNoticia,
    excluirNoticia,
    listarTodasNoticias,
    buscarNoticia
};