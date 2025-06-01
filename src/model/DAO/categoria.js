const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir categoria
async function insertCategoria(categoria) {
    try {
        let sql = `INSERT INTO tbl_categoria (
                        nome,
                        descricao,
                        sigla
                    ) VALUES (
                        '${categoria.nome}',
                        '${categoria.descricao}',
                        '${categoria.sigla}'
                    )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM categoria ORDER BY id DESC LIMIT 1`
            let categoriaCriada = await prisma.$queryRawUnsafe(sqlSelect)
            return categoriaCriada[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar categoria
async function updateCategoria(categoria) {
    try {
        let sql = `UPDATE tbl_categoria SET
                        nome = '${categoria.nome}',
                        descricao = '${categoria.descricao}',
                        sigla = '${categoria.sigla}'
                    WHERE id = ${categoria.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM categoria WHERE id = ${categoria.id}`
            let categoriaAtualizada = await prisma.$queryRawUnsafe(sqlSelect)
            return categoriaAtualizada[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Deletar categoria
async function deleteCategoria(idCategoria) {
    try {
        let sql = `DELETE FROM tbl_categoria WHERE id = ${idCategoria}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar todas as categorias
async function selectAllCategoria() {
    try {
        let sql = 'SELECT * FROM tbl_categoria ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar categoria por ID
async function selectByIdCategoria(idCategoria) {
    try {
        console.log(idCategoria);
        
        let sql = `SELECT * FROM tbl_categoria WHERE id = ${idCategoria}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result[0] : false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    selectAllCategoria,
    selectByIdCategoria
}
