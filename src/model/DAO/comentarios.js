const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir comentário
async function insertComentario(comentario) {
    try {
        let sql = `INSERT INTO tbl_comentarios (
                        conteudo,
                        data_postagem,
                        tbl_noticia_id,
                        tbl_usuario_id
                    ) VALUES (
                        '${comentario.conteudo}',
                        '${comentario.data_postagem}',
                        ${comentario.tbl_noticia_id},
                        ${comentario.tbl_usuario_id}
                    )`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_comentarios ORDER BY id DESC LIMIT 1`;
            let comentarioCriado = await prisma.$queryRawUnsafe(sqlSelect);
            return comentarioCriado[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Atualizar comentário
async function updateComentario(comentario) {
    try {
        let sql = `UPDATE tbl_comentarios SET
                        conteudo = '${comentario.conteudo}',
                        data_postagem = '${comentario.data_postagem}',
                        tbl_noticia_id = ${comentario.tbl_noticia_id}
                        tbl_usuario_id = ${comentario.tbl_usuario_id}
                    WHERE id = ${comentario.id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_comentarios WHERE id = ${comentario.id}`;
            let comentarioAtualizado = await prisma.$queryRawUnsafe(sqlSelect);
            return comentarioAtualizado[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Deletar comentário
async function deleteComentario(idComentario) {
    try {
        let sql = `DELETE FROM tbl_comentarios WHERE id = ${idComentario}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Buscar todos os comentários
async function selectAllComentario() {
    try {
        let sql = 'SELECT * FROM tbl_comentarios ORDER BY id DESC';
        let result = await prisma.$queryRawUnsafe(sql);
        return result ? result : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Buscar comentário por ID
async function selectByIdComentario(idComentario) {
    try {
        let sql = `SELECT * FROM tbl_comentarios WHERE id = ${idComentario}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result ? result[0] : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Buscar comentário por ID
async function selectByIdComentarioOfNoticia(idNoticia) {
    try {
        let sql = `SELECT * FROM tbl_comentarios WHERE tbl_noticia_id = ${idNoticia}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result ? result[0] : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    insertComentario,
    updateComentario,
    deleteComentario,
    selectAllComentario,
    selectByIdComentario,
    selectByIdComentarioOfNoticia
};
