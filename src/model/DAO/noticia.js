const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir notícia
async function insertNoticia(noticia) {
    try {
        let sql = `INSERT INTO tbl_noticia (
                        titulo,
                        conteudo,
                        endereco,
                        lon,
                        lat,
                        tbl_usuario_id
                    ) VALUES (
                        '${noticia.titulo}',
                        '${noticia.conteudo}',
                        '${noticia.endereco}',
                        ${noticia.lon},
                        ${noticia.lat},
                        ${noticia.tbl_usuario_id}
                    )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_noticia WHERE tbl_usuario_id = ${noticia.tbl_usuario_id} ORDER BY id DESC LIMIT 1`
            let noticiaCriada = await prisma.$queryRawUnsafe(sqlSelect)
            return noticiaCriada[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar notícia
async function updateNoticia(noticia) {
    try {
        let sql = `UPDATE tbl_noticia SET
                        titulo = '${noticia.titulo}',
                        conteudo = '${noticia.conteudo}',
                        endereco = '${noticia.endereco}',
                        lon = ${noticia.lon},
                        lat = ${noticia.lat},
                        tbl_usuario_id = ${noticia.tbl_usuario_id}
                    WHERE id = ${noticia.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_noticia WHERE id = ${noticia.id}`
            let noticiaAtualizada = await prisma.$queryRawUnsafe(sqlSelect)
            return noticiaAtualizada[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Deletar notícia
async function deleteNoticia(idNoticia) {
    try {
        let sql = `DELETE FROM tbl_noticia WHERE id = ${idNoticia}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
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
        return result ? result[0] : false
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


//132131313