const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertUsuario(Usuario){
    try {
        
        let sql = `insert into tbl_usuario (
                                            senha_salt,
                                            senha_hash,
                                            email,
                                            biografia,
                                            data_nascimento,
                                            nome,
                                            foto_perfil              
                                        ) values (
                                            '${Usuario.senha_salt}',
                                            '${Usuario.senha_hash}',
                                            '${Usuario.email}',
                                            '${Usuario.biografia}',
                                            '${Usuario.data_nascimento}',
                                            '${Usuario.nome}',
                                            '${Usuario.foto_perfil}'
                                        )`

        //executar script no BD        
        let result = await prisma.$executeRawUnsafe(sql)
        console.log(result);
        console.log("----");

        // Faz o SELECT para retornar o objeto recém-criado
        if (result) {
            let sqlSelect = `SELECT * FROM tbl_usuario WHERE email = '${Usuario.email}' ORDER BY id DESC LIMIT 1`
            let Criado = await prisma.$queryRawUnsafe(sqlSelect)
            return Criado[0] // Retorna o objeto completo
        } else {
            console.log(result)
            return false
            
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// atualizar
async function updateUsuario(Usuario){
    try {
        let sql = `update tbl_usuario set  senha_salt = '${Usuario.senha_salt}',
                                        senha_hash = '${Usuario.senha_hash}',
                                        email = '${Usuario.email}',
                                        biografia = '${Usuario.biografia}',
                                        data_nascimento = '${Usuario.data_nascimento.split('T')[0]}',
                                        nome = '${Usuario.nome}',
                                        foto_perfil = '${Usuario.foto_perfil}'           
                                        
                                where id = ${Usuario.id}`
        // console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)
        console.log(result);
        console.log("----");
        
        

        // Faz o SELECT para retornar o objeto recém-criado
        if (result) {
            let sqlSelect = `SELECT * FROM tbl_usuario WHERE email = '${Usuario.email}' ORDER BY id DESC LIMIT 1`
            let usuarioCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return usuarioCriado[0] // Retorna o objeto completo
        } else {
            return false
        }
    } catch (error) {
        console.log(error)        
        return false
    }
}

async function loginUsuario(email) {
    try {
        let sql = `SELECT * FROM tbl_usuario WHERE email = '${email}'`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// deletar
async function deleteUsuario(idUsuario){
    try {
        let sql = `DELETE FROM tbl_usuario WHERE id = ${idUsuario}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllUsuario(){
    try {
        let sql = 'select * from tbl_usuario order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdUsuario(idUsuario){
    try {
        let sql = `SELECT * FROM tbl_usuario WHERE id = ${idUsuario}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    loginUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}