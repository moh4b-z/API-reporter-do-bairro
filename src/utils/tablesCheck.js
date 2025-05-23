const CORRECTION = require("./inputCheck")


function CHECK_tbl_usuario(usuario){ 
    console.log(CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_salt, 32) ,
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_hash, 128) ,
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.email, 100) ,
        CORRECTION.CHECK_UNDEFINED(usuario.biografia) ,
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.data_de_nascimento, 10) ,
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.nome, 50) ,
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.foto_perfil, 250));
    
    
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_salt, 32) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_hash, 128) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.email, 100) &&
        CORRECTION.CHECK_UNDEFINED(usuario.biografia) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.data_de_nascimento, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.nome, 50) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.foto_perfil, 250)
    ){
        return true
    }else{
        return false
    }
}



module.exports = {
    CHECK_tbl_usuario
}