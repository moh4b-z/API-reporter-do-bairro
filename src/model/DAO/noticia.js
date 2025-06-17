const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir notícia
async function insertNoticia(noticia) {
    try {
        console.log(noticia);

        const novaNoticia = await prisma.tbl_noticia.create({
            data: {
                titulo: noticia.titulo,
                conteudo: noticia.conteudo,
                lon: noticia.lon,
                lat: noticia.lat,
                tbl_usuario_id: noticia.tbl_usuario_id,
                data_postagem: new Date (noticia.data_postagem),
                tbl_endereco_id: noticia.tbl_endereco_id
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
                lon: noticia.lon,
                lat: noticia.lat,
                tbl_usuario_id: noticia.tbl_usuario_id,
                tbl_endereco_id: noticia.tbl_endereco_id
            }
        });

        return noticiaAtualizada;
    } catch (error) {
        console.error("Erro ao atualizar notícia:", error)
        return false
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
        const sql = 'SELECT * FROM tbl_noticia ORDER BY id DESC';
        const result = await prisma.$queryRawUnsafe(sql);
        return result ? result : false;
    } catch (error) {
        console.error("Erro ao buscar todas as notícias:", error);
        return false;
    }
}

// Buscar notícia por ID
async function selectByIdNoticia(idNoticia) {
    try {
        const sql = `SELECT * FROM tbl_noticia WHERE id = ${idNoticia}`;
        const result = await prisma.$queryRawUnsafe(sql);
        return result ? result : false
    } catch (error) {
        console.error("Erro ao buscar notícia por ID:", error);
        return false;
    }
}

// Buscar notícias por ID do usuário
async function selectByUsuarioId(usuarioId) {
    try {
        const sql = `SELECT * FROM tbl_noticia WHERE tbl_usuario_id = ${usuarioId} ORDER BY id DESC`;
        const result = await prisma.$queryRawUnsafe(sql);
        return result ? result : false;
    } catch (error) {
        console.error("Erro ao buscar notícias por ID do usuário:", error);
        return false;
    }
}

module.exports = {
    insertNoticia,
    updateNoticia,
    deleteNoticia,
    selectAllNoticias,
    selectByIdNoticia,
    selectByUsuarioId
}
