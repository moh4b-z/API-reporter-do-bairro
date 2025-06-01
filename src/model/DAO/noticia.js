const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Inserir notícia
async function insertNoticia(noticia) {
    try {
        const novaNoticia = await prisma.tbl_noticia.create({
            data: {
                titulo: noticia.titulo,
                conteudo: noticia.conteudo,
                data_postagem: noticia.data_postagem,
                tbl_usuario_id: noticia.tbl_usuario_id,
                tbl_endereco_id: noticia.tbl_endereco_id // Agora usa a FK para tbl_endereco
            }
        });
        return novaNoticia;
    } catch (error) {
        console.error("Erro ao inserir notícia:", error);
        return false;
    }
}

// Atualizar notícia
async function updateNoticia(noticia) {
    try {
        const noticiaAtualizada = await prisma.tbl_noticia.update({
            where: {
                id: noticia.id
            },
            data: {
                titulo: noticia.titulo,
                conteudo: noticia.conteudo,
                data_postagem: noticia.data_postagem,
                tbl_usuario_id: noticia.tbl_usuario_id,
                tbl_endereco_id: noticia.tbl_endereco_id // Agora usa a FK para tbl_endereco
            }
        });
        return noticiaAtualizada;
    } catch (error) {
        console.error("Erro ao atualizar notícia:", error);
        return false;
    }
}

// Deletar notícia
async function deleteNoticia(idNoticia) {
    try {
        const result = await prisma.tbl_noticia.delete({
            where: {
                id: idNoticia
            }
        });
        return result ? true : false;
    } catch (error) {
        console.error("Erro ao deletar notícia:", error);
        return false;
    }
}


// Buscar todas as notícias
async function selectAllNoticias() {
    try {
        let sql = 'SELECT * FROM tbl_noticia ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar notícia por ID
async function selectByIdNoticia(idNoticia) {
    try {
        let sql = `SELECT * FROM tbl_noticia WHERE id = ${idNoticia}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertNoticia,
    updateNoticia,
    deleteNoticia,
    selectAllNoticias,
    selectByIdNoticia
}
