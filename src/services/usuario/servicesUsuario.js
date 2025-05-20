const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")
const encryptionFunction = require("../../utils/encryptionFunction")

const servicesSexo = require("../sexo/servicesSexo")
const servicesPaises = require("../paises/servicesPaises")

const usuarioDAO = require("../../model/DAO/usuario")

async function inserirUsuario(Usuario, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Usuario)
            // 
            
            const { senha_salt, senha_hash } = encryptionFunction.hashPassword(Usuario.senha)
            Usuario.senha_salt = senha_salt
            Usuario.senha_hash = senha_hash
            delete Usuario.senha
            
            if(TableCORRECTION.CHECK_tbl_usuario(Usuario)){
                if(
                    servicesSexo.buscarSexo(Usuario.id_sexo) && 
                    servicesPaises.buscarPaises(Usuario.id_paises)
                ){
                    let resultUsuario = await usuarioDAO.insertUsuario(Usuario)
                    console.log(resultUsuario)
                    if (resultUsuario){
                        return {
                            ...MENSAGE.SUCCESS_CEATED_ITEM,
                            usuario: resultUsuario
                        }
                    }else{
                        console.log(Usuario)
                        // console.log(resultUsuario)
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return MENSAGE.ERROR_NOT_FOUND_FOREIGN_KEY
                }
                
            }else{
                
                // console.log(TableCORRECTION.CHECK_tbl_usuario(Usuario))
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        }else{
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        // console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
    
}

async function atualizarUsuario(Usuario, idUsuario, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Usuario)
            // console.log(CORRECTION.verificarAtributosUsuario(Usuario))
            // console.log(CORRECTION.CHECK_ID(idUsuario))
            // console.log((Usuario))
            // console.log((idUsuario))
            
            
            if(TableCORRECTION.CHECK_tbl_usuario(Usuario) && CORRECTION.CHECK_ID(idUsuario)){

                let resultUsuario = await buscarUsuario(parseInt(idUsuario))
                
                if(resultUsuario.status_code == 201){
                    if(
                        servicesSexo.buscarSexo(Usuario.id_sexo) && 
                        servicesPaises.buscarPaises(Usuario.id_paises)
                    ){
                        Usuario.id = parseInt(idUsuario)

                        let result = await usuarioDAO.updateUsuario(Usuario)
                        // console.log(result)
                        
                        if(result){
                            return MENSAGE.SUCCESS_UPDATED_ITEM
                        }else{
                            console.log(result);
                            
                            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return MENSAGE.ERROR_NOT_FOUND_FOREIGN_KEY
                    }
                }else if(resultUsuario.status_code == 404){

                    return MENSAGE.ERROR_NOT_FOUND
                }else{
                    return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
                }
                
            }else{
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        }else{

            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function loginUsuario(loginData, contentType) {
    try {
        if (contentType == "application/json") {
            const { email, senha } = loginData

            if (!email || !senha) {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }

            const usuario = await usuarioDAO.loginUsuario(email)

            if (!usuario) {
                return MENSAGE.ERROR_NOT_FOUND 
            }
            const senhaValida = encryptionFunction.verifyPassword(
                senha,
                usuario.senha_salt,
                usuario.senha_hash
            )
            if (senhaValida) {
                // remove os dados sensíveis
                delete usuario.senha_salt
                delete usuario.senha_hash

                return {
                    ...MENSAGE.SUCCESS_LOGIN,
                    usuario: usuario
                }
            } else {
                return MENSAGE.ERROR_INVALID_CREDENTIALS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function excluirUsuario(idUsuario) {
    try { 
        if(CORRECTION.CHECK_ID(idUsuario)){
            let verification = await usuarioDAO.selectByIdUsuario(parseInt(idUsuario))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultUsuario = await usuarioDAO.deleteUsuario(parseInt(idUsuario))
                    return resultUsuario ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
                }else{
                    return MENSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
        
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function listarTodosUsuario() {
    try {
        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
            if(resultUsuario.length > 0){
                let dadosUsuarios = {
                    "status": true,
                    "status_code": 201,
                    "items": resultUsuario.length,
                    "users": resultUsuario
                }
                return dadosUsuarios
            }else{
                return MENSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarUsuario(idUsuario) {
    try {
        // console.log(idUsuario);
        
        if(CORRECTION.CHECK_ID(idUsuario)){
            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(idUsuario))

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    let dadosUsuarios = {
                        "status": true,
                        "status_code": 201,
                        "user": resultUsuario
                    }
                    return dadosUsuarios
                }else{
                    return MENSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
        
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}



module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarTodosUsuario,
    buscarUsuario,
    loginUsuario
}