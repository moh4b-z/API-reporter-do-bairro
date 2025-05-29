CREATE DATABASE db_controle_bairro;

use db_controle_bairro;

-- Tabela: tbl_usuario
CREATE TABLE tbl_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE,
    senha_salt VARCHAR(32),
    senha_hash VARCHAR(128),
    email VARCHAR(250) UNIQUE,
    data_nascimento DATE,
    foto_perfil VARCHAR(300),
    biografia VARCHAR(300)
);

-- Tabela: tbl_midia
CREATE TABLE tbl_midia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url_img VARCHAR(45)
);

-- Tabela: categoria
CREATE TABLE tbl_categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao VARCHAR(200),
    sigla VARCHAR(5)
);

-- Tabela: tbl_endereco
CREATE TABLE tbl_endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cep INT NOT NULL,
    logradouro VARCHAR(200) NOT NULL
);

-- Tabela: tbl_noticia
CREATE TABLE tbl_noticia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    conteudo TEXT,
    lon DECIMAL(11,7),
    lat DECIMAL(10,7),
    tbl_usuario_id INT,
    tbl_endereco_id INT,
    FOREIGN KEY (tbl_usuario_id) REFERENCES tbl_usuario(id),
    FOREIGN KEY (tbl_endereco_id) REFERENCES tbl_endereco(id)
);


-- Tabela: tbl_midia_noticia (tabela associativa entre notícia e mídia)
CREATE TABLE tbl_midia_noticia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tbl_noticia_id INT,
    tbl_midia_id INT,
    FOREIGN KEY (tbl_noticia_id) REFERENCES tbl_noticia(id),
    FOREIGN KEY (tbl_midia_id) REFERENCES tbl_midia(id)
);

-- Tabela: tbl_noticia_categoria (tabela associativa entre notícia e categoria)
CREATE TABLE tbl_noticia_categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tbl_noticia_id INT,
    tbl_categoria_id INT,
    FOREIGN KEY (tbl_noticia_id) REFERENCES tbl_noticia(id),
    FOREIGN KEY (tbl_categoria_id) REFERENCES tbl_categoria(id)
);



