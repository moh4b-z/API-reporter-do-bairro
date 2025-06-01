const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir associação notícia-categoria
async function insertNoticiaCategoria(noticiaCategoria) {
    try {
        let sql = `INSERT INTO tbl_noticia_categoria (
                        tbl_noticia_id,
                        tbl_categoria_id
                    ) VALUES (
                        ${noticiaCategoria.tbl_noticia_id},
                        ${noticiaCategoria.tbl_categoria_id}
                    )`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_noticia_categoria ORDER BY id DESC LIMIT 1`;
            let noticiaCategoriaCriada = await prisma.$queryRawUnsafe(sqlSelect);
            return noticiaCategoriaCriada[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Atualizar associação
async function updateNoticiaCategoria(noticiaCategoria) {
    try {
        let sql = `UPDATE tbl_noticia_categoria SET
                        tbl_noticia_id = ${noticiaCategoria.tbl_noticia_id},
                        tbl_categoria_id = ${noticiaCategoria.tbl_categoria_id}
                    WHERE id = ${noticiaCategoria.id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_noticia_categoria WHERE id = ${noticiaCategoria.id}`;
            let noticiaCategoriaAtualizada = await prisma.$queryRawUnsafe(sqlSelect);
            return noticiaCategoriaAtualizada[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Deletar associação
async function deleteNoticiaCategoria(id) {
    try {
        let sql = `DELETE FROM tbl_noticia_categoria WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Buscar todas as associações
async function selectAllNoticiaCategoria() {
    try {
        let sql = 'SELECT * FROM tbl_noticia_categoria ORDER BY id DESC';
        let result = await prisma.$queryRawUnsafe(sql);
        return result ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar associação por ID
async function selectByIdNoticiaCategoria(id) {
    try {
        let sql = `SELECT * FROM tbl_noticia_categoria WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}
// Buscar associação por ID
async function selectCategoriasByNoticiaId(id) {
    try {
        let sql = `SELECT * FROM tbl_noticia_categoria WHERE tbl_noticia_id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertNoticiaCategoria,
    updateNoticiaCategoria,
    deleteNoticiaCategoria,
    selectAllNoticiaCategoria,
    selectByIdNoticiaCategoria,
    selectCategoriasByNoticiaId
};
