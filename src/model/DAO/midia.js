const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir mídia
async function insertMidia(midia) {
    try {
        let sql = `INSERT INTO tbl_midia (
                        url_img
                        
                    ) VALUES (
                        '${midia.url_img}'
        
                    )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_midia ORDER BY id DESC LIMIT 1`
            let midiaCriada = await prisma.$queryRawUnsafe(sqlSelect)
            return midiaCriada[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar mídia
async function updateMidia(midia) {
    try {
        let sql = `UPDATE tbl_midia SET
                        url_img = '${midia.url_img}'
                    WHERE id = ${midia.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_midia WHERE id = ${midia.id}`
            let midiaAtualizada = await prisma.$queryRawUnsafe(sqlSelect)
            return midiaAtualizada[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Deletar mídia
async function deleteMidia(idMidia) {
    try {
        let sql = `DELETE FROM tbl_midia WHERE id = ${idMidia}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar todas as mídias
async function selectAllMidias() {
    try {
        let sql = 'SELECT * FROM tbl_midia ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar mídia por ID
async function selectByIdMidia(idMidia) {
    try {
        let sql = `SELECT * FROM tbl_midia WHERE id = ${idMidia}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result[0] : false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertMidia,
    updateMidia,
    deleteMidia,
    selectAllMidias,
    selectByIdMidia
}
