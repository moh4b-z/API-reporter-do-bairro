CREATE DATABASE db_controle_bairro;

use db_controle_bairro;

-- Tabela: tbl_usuario
CREATE TABLE tbl_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    senha_salt VARCHAR(32) NOT NULL,
    senha_hash VARCHAR(128) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    data_nascimento DATE,
    foto_perfil VARCHAR(300),
    biografia TEXT
);



-- Tabela: categoria
CREATE TABLE tbl_categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(200),
    sigla VARCHAR(5) UNIQUE
);

-- Tabela: tbl_endereco
CREATE TABLE tbl_endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(10) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    complemento VARCHAR(200),
    bairro VARCHAR(100),
    localidade VARCHAR(100),
    uf VARCHAR(2),
    ibge VARCHAR(10),
    gia VARCHAR(10),
    siafi VARCHAR(10),
    display_name VARCHAR(600) NOT NULL,
    lat DECIMAL(10,7) NOT NULL,
    lon DECIMAL(11,7) NOT NULL
);

-- Tabela: tbl_noticia
CREATE TABLE tbl_noticia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    conteudo TEXT,
    data_postagem DATE NOT NULL,
    tbl_usuario_id INT NOT NULL,
    tbl_endereco_id INT NOT NULL,
    FOREIGN KEY (tbl_usuario_id) REFERENCES tbl_usuario(id),
    FOREIGN KEY (tbl_endereco_id) REFERENCES tbl_endereco(id)
);

-- Tabela: tbl_midia
CREATE TABLE tbl_midia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url_midia VARCHAR(1000) NOT NULL,
    tbl_noticia_id INT NOT NULL,
    FOREIGN KEY (tbl_noticia_id) REFERENCES tbl_noticia(id)
);


-- Tabela: tbl_noticia_categoria (tabela associativa entre notícia e categoria)
CREATE TABLE tbl_noticia_categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tbl_noticia_id INT NOT NULL,
    tbl_categoria_id INT NOT NULL,
    FOREIGN KEY (tbl_noticia_id) REFERENCES tbl_noticia(id),
    FOREIGN KEY (tbl_categoria_id) REFERENCES tbl_categoria(id)
);

CREATE TABLE tbl_comentarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conteudo TEXT NOT NULL,
    data_postagem DATE NOT NULL,
    tbl_noticia_id INT,
    FOREIGN KEY (tbl_noticia_id) REFERENCES tbl_noticia(id),
    tbl_usuario_id INT,
    FOREIGN KEY (tbl_usuario_id) REFERENCES tbl_usuario(id)
);
