
const { PrismaClient } = require('@prisma/client');
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient();

// Inserir um novo endereço
async function insertEndereco(endereco) {
    try {
        // console.log(endereco);
        // console.log("endereco");
        const novoEndereco = await prisma.tbl_endereco.create({
            data: {
                cep: endereco.cep,
                logradouro: endereco.logradouro,
                complemento: endereco.complemento,
                bairro: endereco.bairro,
                localidade: endereco.localidade,
                uf: endereco.uf,
                ibge: endereco.ibge,
                gia: endereco.gia,
                siafi: endereco.siafi,
                display_name: endereco.display_name,
                lat: endereco.lat,
                lon: endereco.lon
            }
        })
        return novoEndereco
    } catch (error) {
        console.error("Erro ao inserir endereço:", error);
        return null
    }
}

// Atualizar um endereço existente
async function updateEndereco(endereco) {
    try {
        const updatedEndereco = await prisma.tbl_endereco.update({
            where: {
                id: endereco.id
            },
            data: {
                cep: endereco.cep,
                logradouro: endereco.logradouro,
                complemento: endereco.complemento,
                bairro: endereco.bairro,
                localidade: endereco.localidade,
                uf: endereco.uf,
                ibge: endereco.ibge,
                gia: endereco.gia,
                siafi: endereco.siafi,
                display_name: endereco.display_name,
                lat: endereco.lat,
                lon: endereco.lon
            }
        });
        return updatedEndereco ? true : false;
    } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        return false;
    }
}

// Deletar um endereço
async function deleteEndereco(idEndereco) {
    try {
        const result = await prisma.tbl_endereco.delete({
            where: {
                id: idEndereco
            }
        });
        return result ? true : false;
    } catch (error) {
        console.error("Erro ao deletar endereço:", error);
        return false;
    }
}

// Selecionar todos os endereços
async function selectAllEnderecos() {
    try {
        let sql = 'SELECT * FROM tbl_endereco ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.error("Erro ao selecionar todos os endereços:", error);
        return false;
    }
}

// Filtrar endereço pelo ID
async function selectByIdEndereco(idEndereco) {
    try {
        let sql = `SELECT * FROM tbl_endereco WHERE id = ${idEndereco}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result[0] : false
    } catch (error) {
        console.error("Erro ao selecionar endereço por ID:", error);
        return false;
    }
}

module.exports = {
    insertEndereco,
    updateEndereco,
    deleteEndereco,
    selectAllEnderecos,
    selectByIdEndereco
};