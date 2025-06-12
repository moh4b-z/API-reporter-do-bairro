const CORRECTION = require("./inputCheck");

function CHECK_tbl_usuario(usuario) {
    return (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_salt, 32) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_hash, 128) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.email, 250) &&
        CORRECTION.CHECK_UNDEFINED(usuario.biografia) && // aceita undefined ou null
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.data_nascimento, 24) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.nome, 100) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.foto_perfil, 300)
    );
}

function CHECK_tbl_categoria(categoria) {
    return (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.nome, 100) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.descricao, 200) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.sigla, 5)
    );
}

function CHECK_tbl_endereco(endereco) {
    return (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(endereco.cep, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(endereco.logradouro, 200) &&
        CORRECTION.CHECK_VARCHAR(endereco.complemento, 200) && 
        CORRECTION.CHECK_VARCHAR(endereco.bairro, 100) &&       
        CORRECTION.CHECK_VARCHAR(endereco.localidade, 100) &&   
        CORRECTION.CHECK_VARCHAR(endereco.uf, 2) &&             
        CORRECTION.CHECK_VARCHAR(endereco.ibge, 10) &&          
        CORRECTION.CHECK_VARCHAR(endereco.gia, 10) &&           
        CORRECTION.CHECK_VARCHAR(endereco.siafi, 10) &&         
        CORRECTION.CHECK_VARCHAR(endereco.display_name, 500) && 
        CORRECTION.CHECK_DECIMAL_NOT_NULL(endereco.lat, 10, 7) &&
        CORRECTION.CHECK_DECIMAL_NOT_NULL(endereco.lon, 11, 7)
    );
}

function CHECK_tbl_noticia(noticia) {
    return (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(noticia.titulo, 100) &&
        CORRECTION.CHECK_UNDEFINED(noticia.conteudo) &&         
        CORRECTION.CHECK_VARCHAR_NOT_NULL(noticia.data_postagem, 24) &&
        CORRECTION.CHECK_ID(noticia.tbl_usuario_id) &&
        CORRECTION.CHECK_ID(noticia.tbl_endereco_id)
    );
}

function CHECK_tbl_midia(midia) {
    return (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(midia.url_midia, 500) &&
        CORRECTION.CHECK_ID(midia.tbl_noticia_id)
    );
}

function CHECK_tbl_noticia_categoria(noticiaCategoria) {
    return (
        CORRECTION.CHECK_ID(noticiaCategoria.tbl_noticia_id) &&
        CORRECTION.CHECK_ID(noticiaCategoria.tbl_categoria_id)
    );
}

function CHECK_tbl_comentarios(comentario) {
    return (
        CORRECTION.CHECK_UNDEFINED(comentario.conteudo) &&       
        CORRECTION.CHECK_VARCHAR_NOT_NULL(comentario.data_postagem, 24) &&
        CORRECTION.CHECK_ID(comentario.tbl_noticia_id) &&
        CORRECTION.CHECK_ID(comentario.tbl_usuario_id)
    );
}

module.exports = {
    CHECK_tbl_usuario,
    CHECK_tbl_noticia,
    CHECK_tbl_categoria,
    CHECK_tbl_midia,
    CHECK_tbl_noticia_categoria,
    CHECK_tbl_endereco,
    CHECK_tbl_comentarios,
};
