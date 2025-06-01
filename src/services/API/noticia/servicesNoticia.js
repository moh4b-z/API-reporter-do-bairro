const MENSAGE = require("../../../modulo/config");
const CORRECTION = require("../../../utils/inputCheck");
const TableCORRECTION = require("../../../utils/tablesCheck");

const noticiaDAO = require("../../../model/DAO/noticia");
const enderecoDAO = require("../../../model/DAO/endereco");
const midiaDAO = require("../../../model/DAO/midia");
const noticiaCategoriaDAO = require("../../../model/DAO/noticiaCategoria");
const categoriaDAO = require("../../../model/DAO/categoria");

async function inserirNoticia(noticia, contentType) {
    try {
        if (contentType === "application/json") {
            const { titulo, conteudo, tbl_usuario_id, endereco, urls_midia, categorias_id } = noticia;

            // Validação básica para campos essenciais da notícia
            if (!titulo || !conteudo || !tbl_usuario_id || !endereco || !urls_midia || urls_midia.length === 0 || !categorias_id || categorias_id.length === 0) {
                return MENSAGE.ERROR_REQUIRED_FIELDS;
            }

            // 1. Inserir o endereço
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
                tbl_endereco_id: novoEndereco.id
            };

            const resultNoticia = await noticiaDAO.insertNoticia(noticiaParaInserir);

            if (!resultNoticia) {
                await enderecoDAO.deleteEndereco(novoEndereco.id); // Reverte a inserção do endereço
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
            }

            // 3. Inserir as mídias associadas à notícia
            const midiasInseridas = [];
            for (const url of urls_midia) {
                const midiaParaInserir = {
                    url: url,
                    tbl_noticia_id: resultNoticia.id
                };
                if (!TableCORRECTION.CHECK_tbl_midia(midiaParaInserir)) {
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

            // 4. Inserir as associações de categorias para a notícia
            const categoriasAssociadas = [];
            for (const categoria_id of categorias_id) {
                const associacaoParaInserir = {
                    tbl_noticia_id: resultNoticia.id,
                    tbl_categoria_id: categoria_id
                };
                // Assume que CHECK_tbl_noticia_categoria verifica os IDs
                if (!TableCORRECTION.CHECK_tbl_noticia_categoria(associacaoParaInserir)) {
                    console.warn(`ID de categoria inválido: ${categoria_id}`);
                    continue;
                }
                const novaAssociacao = await noticiaCategoriaDAO.inserirNoticiaCategoria(associacaoParaInserir, contentType); // Passa o contentType
                if (novaAssociacao && novaAssociacao.status_code === 201) { // Verifica o status_code do retorno do service de categoria
                    categoriasAssociadas.push(novaAssociacao.noticia_categoria);
                } else {
                    console.error(`Falha ao associar categoria ${categoria_id} à notícia ${resultNoticia.id}`);
                }
            }

            const noticiaCompleta = {
                ...resultNoticia,
                endereco: novoEndereco,
                midias: midiasInseridas,
                categorias: categoriasAssociadas
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
            const { titulo, conteudo, tbl_usuario_id, endereco, urls_midia, categorias_id } = noticia;

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
                    endereco.id = idEnderecoExistente;
                    const resultUpdateEndereco = await enderecoDAO.updateEndereco(endereco);
                    if (!resultUpdateEndereco) {
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                    }
                    novoEnderecoAtualizado = await enderecoDAO.selectByIdEndereco(idEnderecoExistente);
                } else {
                    const resultInsertEndereco = await enderecoDAO.insertEndereco(endereco);
                    if (!resultInsertEndereco) {
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                    }
                    idEnderecoExistente = resultInsertEndereco.id;
                    novoEnderecoAtualizado = resultInsertEndereco;
                }
            } else if (idEnderecoExistente) {
                novoEnderecoAtualizado = await enderecoDAO.selectByIdEndereco(idEnderecoExistente);
            }


            // 2. Atualizar a notícia
            const noticiaParaAtualizar = {
                id: parseInt(idNoticia),
                titulo: titulo || buscaNoticia.titulo,
                conteudo: conteudo || buscaNoticia.conteudo,
                tbl_usuario_id: tbl_usuario_id || buscaNoticia.tbl_usuario_id,
                tbl_endereco_id: idEnderecoExistente
            };
            const resultNoticia = await noticiaDAO.updateNoticia(noticiaParaAtualizar);

            if (!resultNoticia) {
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
            }

            // 3. Atualizar as mídias associadas à notícia
            // Primeiro, deleta as mídias existentes para a notícia
            const midiasAntigas = await midiaDAO.selectMidiasByNoticiaId(parseInt(idNoticia));
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

            // 4. Atualizar as associações de categorias para a notícia
            // Primeiro, deleta as associações existentes
            const associacoesAntigas = await noticiaCategoriaDAO.selectNoticiaCategoriasByNoticiaId(parseInt(idNoticia)); // Você precisará criar essa função no seu DAO de associação
            if (associacoesAntigas && associacoesAntigas.length > 0) {
                for (const associacaoAntiga of associacoesAntigas) {
                    await noticiaCategoriaDAO.excluirNoticiaCategoria(associacaoAntiga.id); // Assume que o ID da associação é o parâmetro
                }
            }

            // Em seguida, insere as novas associações
            const categoriasAtualizadas = [];
            if (categorias_id && categorias_id.length > 0) {
                for (const categoria_id of categorias_id) {
                    const associacaoParaInserir = {
                        tbl_noticia_id: parseInt(idNoticia),
                        tbl_categoria_id: categoria_id
                    };
                    if (!TableCORRECTION.CHECK_tbl_noticia_categoria(associacaoParaInserir)) {
                        console.warn(`ID de categoria inválido durante atualização: ${categoria_id}`);
                        continue;
                    }
                    const novaAssociacao = await noticiaCategoriaDAO.inserirNoticiaCategoria(associacaoParaInserir, contentType);
                    if (novaAssociacao && novaAssociacao.status_code === 201) {
                        categoriasAtualizadas.push(novaAssociacao.noticia_categoria);
                    } else {
                        console.error(`Falha ao associar categoria ${categoria_id} à notícia ${idNoticia} durante atualização`);
                    }
                }
            }

            const noticiaCompletaAtualizada = {
                ...resultNoticia,
                endereco: novoEnderecoAtualizado,
                midias: midiasAtualizadas,
                categorias: categoriasAtualizadas
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
            const midiasAssociadas = await midiaDAO.selectMidiasByNoticiaId(parseInt(idNoticia));
            if (midiasAssociadas && midiasAssociadas.length > 0) {
                for (const midia of midiasAssociadas) {
                    await midiaDAO.deleteMidia(midia.id);
                }
            }

            // Deletar as associações de categoria da notícia
            const categoriasAssociadas = await noticiaCategoriaDAO.selectNoticiaCategoriasByNoticiaId(parseInt(idNoticia));
            if (categoriasAssociadas && categoriasAssociadas.length > 0) {
                for (const associacao of categoriasAssociadas) {
                    await noticiaCategoriaDAO.excluirNoticiaCategoria(associacao.id);
                }
            }

            // Deletar a notícia
            const result = await noticiaDAO.deleteNoticia(parseInt(idNoticia));

            if (result) {
                // Considerar deletar o endereço se ele não estiver mais associado a nenhuma outra notícia
                // Isso exigiria uma lógica mais complexa. Por enquanto, mantemos o endereço.
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
        const resultNoticias = await noticiaDAO.selectAllNoticias()

        if (resultNoticias && resultNoticias.length > 0) {
            const noticiasComDetalhes = []
            for (const noticia of resultNoticias) {
                const endereco = await enderecoDAO.selectByIdEndereco(noticia.tbl_endereco_id)

                const midias = await midiaDAO.selectMidiasByNoticiaId(noticia.id)
                const categorias = []
                const categoriasNoticia = await noticiaCategoriaDAO.selectCategoriasByNoticiaId(noticia.id)
                
                for(let categoriaNoticia of categoriasNoticia){
                    const categoria = await categoriaDAO.selectByIdCategoria(categoriaNoticia.tbl_categoria_id)
                    categorias.push(categoria)
                }
                delete noticia.tbl_endereco_id
                noticiasComDetalhes.push({
                    ...noticia,
                    endereco: endereco || null,
                    urls_midia: midias || [],
                    categorias: categorias || []
                })
            }

            return {
                status: true,
                status_code: 200,
                items: noticiasComDetalhes.length,
                noticias: noticiasComDetalhes
            }
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
            const resultNoticias = await noticiaDAO.selectByIdNoticia(parseInt(idNoticia));

            if (resultNoticias) {
                const noticiasComDetalhes = []
                for (const noticia of resultNoticias) {
                    const endereco = await enderecoDAO.selectByIdEndereco(noticia.tbl_endereco_id)

                    const midias = await midiaDAO.selectMidiasByNoticiaId(noticia.id)
                    const categorias = []
                    const categoriasNoticia = await noticiaCategoriaDAO.selectCategoriasByNoticiaId(noticia.id)
                    
                    for(let categoriaNoticia of categoriasNoticia){
                        const categoria = await categoriaDAO.selectByIdCategoria(categoriaNoticia.tbl_categoria_id)
                        categorias.push(categoria)
                    }
                    delete noticia.tbl_endereco_id
                    noticiasComDetalhes.push({
                        ...noticia,
                        endereco: endereco || null,
                        urls_midia: midias || [],
                        categorias: categorias || []
                    })
                }


                return {
                    status: true,
                    status_code: 200,
                    noticia: noticiasComDetalhes
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