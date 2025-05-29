const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir endereço
async function insertEndereco(endereco) {
    try {
        let sql = `INSERT INTO tbl_endereco (
                        cep,
                        logradouro
                    ) VALUES (
                        ${endereco.cep},
                        '${endereco.logradouro}'
                    )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_endereco ORDER BY id DESC LIMIT 1`
            let enderecoCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return enderecoCriado[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar endereço
async function updateEndereco(endereco) {
    try {
        let sql = `UPDATE tbl_endereco SET
                        cep = ${endereco.cep},
                        logradouro = '${endereco.logradouro}'
                    WHERE id = ${endereco.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_endereco WHERE id = ${endereco.id}`
            let enderecoAtualizado = await prisma.$queryRawUnsafe(sqlSelect)
            return enderecoAtualizado[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Deletar endereço
async function deleteEndereco(idEndereco) {
    try {
        let sql = `DELETE FROM tbl_endereco WHERE id = ${idEndereco}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar todos os endereços
async function selectAllEndereco() {
    try {
        let sql = 'SELECT * FROM tbl_endereco ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar endereço por ID
async function selectByIdEndereco(idEndereco) {
    try {
        let sql = `SELECT * FROM tbl_endereco WHERE id = ${idEndereco}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result[0] : false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertEndereco,
    updateEndereco,
    deleteEndereco,
    selectAllEndereco,
    selectByIdEndereco
}
