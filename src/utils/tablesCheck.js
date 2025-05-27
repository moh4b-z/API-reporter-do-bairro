const CORRECTION = require("./inputCheck")


function CHECK_tbl_usuario(usuario){ 
    console.log(usuario)
    // console.log(CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_salt, 32) ,
    //     CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_hash, 128) ,
    //     CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.email, 100) ,
    //     CORRECTION.CHECK_UNDEFINED(usuario.biografia) ,
    //     CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.data_nascimento, 10) ,
    //     CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.nome, 50) ,
    //     CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.foto_perfil, 250))
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_salt, 32) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_hash, 128) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.email, 100) &&
        CORRECTION.CHECK_UNDEFINED(usuario.biografia) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.data_nascimento, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.nome, 50) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.foto_perfil, 250)
    ){
        return true
    }else{
        return false
    }
}

function CHECK_tbl_categoria(categoria) {
    if (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.nome, 100) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.descricao, 200) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.sigla, 5)
    ) {
        return true
    } else {
        return false
    }
}


function CHECK_tbl_noticia(noticia){ 
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(noticia.titulo, 100) &&
        CORRECTION.CHECK_UNDEFINED(noticia.conteudo) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(noticia.endereco, 300) &&
        CORRECTION.CHECK_DECIMAL_NOT_NULL(noticia.lon)&&
        CORRECTION.CHECK_DECIMAL_NOT_NULL(noticia.lat)&&
        CORRECTION.CHECK_ID(noticia.tbl_usuario_id)
    ){
        return true
    }else{
        return false
    }
}


function CHECK_tbl_midia(midia) {
    if (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(midia.url_img, 45) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(midia.url_videos, 45)
    ) {
        return true
    } else {
        return false
    }
}




module.exports = {
    CHECK_tbl_usuario,
    CHECK_tbl_noticia,
    CHECK_tbl_categoria,
    CHECK_tbl_midia,
}