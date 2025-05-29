const CORRECTION = require("./inputCheck");

function CHECK_tbl_usuario(usuario) {
    if (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_salt, 32) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_hash, 128) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.email, 250) && // Corrigido o tamanho máximo para 250
        CORRECTION.CHECK_UNDEFINED(usuario.biografia) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.data_nascimento, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.nome, 100) && // Corrigido o tamanho máximo para 100
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.foto_perfil, 300) // Corrigido o tamanho máximo para 300
    ) {
        return true;
    } else {
        return false;
    }
}

function CHECK_tbl_categoria(categoria) {
    if (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.nome, 100) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.descricao, 200) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(categoria.sigla, 5)
    ) {
        return true;
    } else {
        return false;
    }
}

function CHECK_tbl_endereco(endereco) {
    if (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(endereco.cep, 10) && // CEP é VARCHAR(10)
        CORRECTION.CHECK_VARCHAR_NOT_NULL(endereco.logradouro, 200) &&
        CORRECTION.CHECK_UNDEFINED(endereco.complemento) && // Pode ser nulo
        CORRECTION.CHECK_UNDEFINED(endereco.bairro) && // Pode ser nulo
        CORRECTION.CHECK_UNDEFINED(endereco.localidade) && // Pode ser nulo
        CORRECTION.CHECK_UNDEFINED(endereco.uf) && // Pode ser nulo
        CORRECTION.CHECK_UNDEFINED(endereco.ibge) && // Pode ser nulo
        CORRECTION.CHECK_UNDEFINED(endereco.gia) && // Pode ser nulo
        CORRECTION.CHECK_UNDEFINED(endereco.siafi) && // Pode ser nulo
        CORRECTION.CHECK_UNDEFINED(endereco.display_name) && // Pode ser nulo
        CORRECTION.CHECK_DECIMAL_NOT_NULL(endereco.lat) &&
        CORRECTION.CHECK_DECIMAL_NOT_NULL(endereco.lon)
    ) {
        return true;
    } else {
        return false;
    }
}


function CHECK_tbl_noticia(noticia) {
    if (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(noticia.titulo, 100) &&
        CORRECTION.CHECK_UNDEFINED(noticia.conteudo) &&
        CORRECTION.CHECK_ID(noticia.tbl_usuario_id) &&
        CORRECTION.CHECK_ID(noticia.tbl_endereco_id) // Referência para a tabela tbl_endereco
    ) {
        return true;
    } else {
        return false;
    }
}

function CHECK_tbl_midia(midia) {
    if (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(midia.url_img, 45) // Corrigido o tamanho máximo para 45
    ) {
        return true;
    } else {
        return false;
    }
}

function CHECK_tbl_noticia_categoria(noticiaCategoria) {
    if (
        CORRECTION.CHECK_ID(noticiaCategoria.tbl_noticia_id) &&
        CORRECTION.CHECK_ID(noticiaCategoria.tbl_categoria_id) // Corrigido para tbl_categoria_id
    ) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    CHECK_tbl_usuario,
    CHECK_tbl_noticia,
    CHECK_tbl_categoria,
    CHECK_tbl_midia,
    CHECK_tbl_noticia_categoria,
    CHECK_tbl_endereco // Exporta a nova função de verificação para endereço
};