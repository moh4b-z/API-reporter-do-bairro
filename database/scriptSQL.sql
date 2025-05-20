CREATE DATABASE db_controle_bairro;

use db_controle_bairro;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS tbl_usuario (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  senha_salt VARCHAR(32) NOT NULL,
  senha_hash VARCHAR(128) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  biografia TEXT,
  data_de_nascimento DATE NOT NULL,
  nome VARCHAR(50) NOT NULL UNIQUE,
  foto_perfil VARCHAR(250) NOT NULL
);
