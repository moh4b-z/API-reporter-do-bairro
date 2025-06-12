const MENSAGE = require("../../../modulo/config");
const CORRECTION = require("../../../utils/inputCheck");
const TableCORRECTION = require("../../../utils/tablesCheck");

const noticiaDAO = require("../../../model/DAO/noticia");
const enderecoDAO = require("../../../model/DAO/endereco");
const midiaDAO = require("../../../model/DAO/midia");
const noticiaCategoriaDAO = require("../../../model/DAO/noticiaCategoria");
const categoriaDAO = require("../../../model/DAO/categoria");
const buscarDadosViaCep = require("../../viaCEP/buscarDadosViaCep");
const servicesEndereco = require("../endereco/servicesEndereco");
const servicesMidia = require("../midia/servicesMidia");
const servicesNoticiaCategoria = require("../noticia_categoria/servicesNoticiaCategoria");
const servicesComentarios = require("../comentarios/servicesComentarios");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function inserirNoticia(noticia, contentType) {
    try {
        if (contentType === "application/json") {
            if (noticia.endereco) {
                console.log(noticia);

                let resultCEP = await buscarDadosViaCep.buscarDadosViaCep(noticia.endereco.cep);

                delete noticia.endereco.cep;
                noticia.endereco = {
                    ...noticia.endereco,
                    ...resultCEP
                };

                let resultEnderoco = await servicesEndereco.inserirEndereco(noticia.endereco, contentType);

                if (resultEnderoco.endereco) {
                    noticia.tbl_endereco_id = resultEnderoco.endereco.id;
                    if (TableCORRECTION.CHECK_tbl_noticia(noticia)) {
                        const result = await noticiaDAO.insertNoticia(noticia);
                        if (result) {
                            result.urls_midia = [];
                            if (noticia.urls_midia) {
                                for (let midia of noticia.urls_midia) {
                                    let midias = await servicesMidia.inserirMidia({
                                        url_midia: midia,
                                        tbl_noticia_id: result.id
                                    }, contentType);
                                    result.urls_midia.push(midias);
                                }
                            }

                            result.categorias = [];
                            if (noticia.categorias) {
                                for (let id_categoria of noticia.categorias) {
                                    let categoria = await servicesNoticiaCategoria.inserirNoticiaCategoria({
                                        tbl_categoria_id: id_categoria,
                                        tbl_noticia_id: result.id
                                    }, contentType);
                                    result.categorias.push(categoria);
                                }
                            }

                            return {
                                ...MENSAGE.SUCCESS_CEATED_ITEM,
                                noticia: result
                            };
                        } else {
                            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL;
                        }
                    } else {
                        return MENSAGE.ERROR_REQUIRED_FIELDS;
                    }
                } else {
                    console.log("na parte de endereços");
                    return resultEnderoco;
                }
            } else {
                console.log("na parte de endereços");
                return MENSAGE.ERROR_REQUIRED_FIELDS;
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.error("Erro ao inserir noticia:", error);
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

            const midiasAntigas = await midiaDAO.selectMidiasByNoticiaId(parseInt(idNoticia));
            if (midiasAntigas && midiasAntigas.length > 0) {
                for (const midiaAntiga of midiasAntigas) {
                    await midiaDAO.deleteMidia(midiaAntiga.id);
                }
            }

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
                    }
                }
            }

            const associacoesAntigas = await noticiaCategoriaDAO.selectNoticiaCategoriasByNoticiaId(parseInt(idNoticia));
            if (associacoesAntigas && associacoesAntigas.length > 0) {
                for (const associacaoAntiga of associacoesAntigas) {
                    await noticiaCategoriaDAO.excluirNoticiaCategoria(associacaoAntiga.id);
                }
            }

            const categoriasAtualizadas = [];
            if (categorias_id && categorias_id.length > 0) {
                for (const categoria_id of categorias_id) {
                    const associacaoParaInserir = {
                        tbl_noticia_id: parseInt(idNoticia),
                        tbl_categoria_id: categoria_id
                    };
                    if (!TableCORRECTION.CHECK_tbl_noticia_categoria(associacaoParaInserir)) {
                        console.warn(`ID de categoria inválido: ${categoria_id}`);
                        continue;
                    }
                    const novaAssociacao = await noticiaCategoriaDAO.inserirNoticiaCategoria(associacaoParaInserir, contentType);
                    if (novaAssociacao?.status_code === 201) {
                        categoriasAtualizadas.push(novaAssociacao.noticia_categoria);
                    }
                }
            }

            return {
                ...MENSAGE.SUCCESS_UPDATED_ITEM,
                noticia: {
                    ...resultNoticia,
                    endereco: novoEnderecoAtualizado,
                    midias: midiasAtualizadas,
                    categorias: categoriasAtualizadas
                }
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

            const result = await noticiaDAO.deleteNoticia(parseInt(idNoticia));
            return result ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE;
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
                const midias = await midiaDAO.selectMidiasByNoticiaId(noticia.id);
                const comentarios = await servicesComentarios.buscarComentariosDeNoticia(noticia.id);
                const categorias = [];
                const categoriasNoticia = await noticiaCategoriaDAO.selectCategoriasByNoticiaId(noticia.id);

                for (let categoriaNoticia of categoriasNoticia) {
                    const categoria = await categoriaDAO.selectByIdCategoria(categoriaNoticia.tbl_categoria_id);
                    categorias.push(categoria);
                }

                delete noticia.tbl_endereco_id;

                noticiasComDetalhes.push({
                    ...noticia,
                    endereco: endereco || null,
                    urls_midia: midias || [],
                    categorias: categorias || [],
                    comentarios: comentarios.comentario ? comentarios.comentario : []
                });
            }

            return {
                status: true,
                status_code: 200,
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
            const resultNoticias = await noticiaDAO.selectByIdNoticia(parseInt(idNoticia));
            if (resultNoticias) {
                const noticiasComDetalhes = [];

                for (const noticia of resultNoticias) {
                    const endereco = await enderecoDAO.selectByIdEndereco(noticia.tbl_endereco_id);
                    const midias = await midiaDAO.selectMidiasByNoticiaId(noticia.id);
                    const comentarios = await servicesComentarios.buscarComentariosDeNoticia(noticia.id);
                    const categorias = [];
                    const categoriasNoticia = await noticiaCategoriaDAO.selectCategoriasByNoticiaId(noticia.id);

                    for (let categoriaNoticia of categoriasNoticia) {
                        const categoria = await categoriaDAO.selectByIdCategoria(categoriaNoticia.tbl_categoria_id);
                        categorias.push(categoria);
                    }

                    delete noticia.tbl_endereco_id;

                    noticiasComDetalhes.push({
                        ...noticia,
                        endereco: endereco || null,
                        urls_midia: midias || [],
                        categorias: categorias || [],
                        comentarios: comentarios.comentario ? comentarios.comentario : []
                    });
                }

                return {
                    status: true,
                    status_code: 200,
                    items: noticiasComDetalhes.length,
                    noticias: noticiasComDetalhes
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

async function buscarNoticiasPorUsuario(idUsuario) {
    try {
      const noticias = await prisma.tbl_noticia.findMany({
        where: {
          tbl_usuario_id: Number(idUsuario)  // aqui o valor direto é suficiente
        },
        include: {
          tbl_endereco: true,
          tbl_usuario: true,
          tbl_comentarios: true,
          tbl_midia: true,
          tbl_noticia_categoria: {
            include: {
              tbl_categoria: true
            }
          }
        }
      });
  
      return {
        status: true,
        status_code: 200,
        dados: noticias
      };
  
    } catch (erro) {
      console.error("Erro ao buscar notícias por usuário:", erro);
      return {
        status: false,
        status_code: 500,
        messagem: "Erro interno ao buscar notícias por usuário."
      };
    }
  }
  
module.exports = {
    inserirNoticia,
    atualizarNoticia,
    excluirNoticia,
    listarTodasNoticias,
    buscarNoticia,
    buscarNoticiasPorUsuario 
};
