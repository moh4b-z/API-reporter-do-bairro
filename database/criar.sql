INSERT INTO tbl_usuario (nome, senha_salt, senha_hash, email, data_nascimento, foto_perfil, biografia) VALUES
    (
        'kauan', 
        'd8ccb7819a32f841d5be1825879f8954', 
        '94786d41a2b3e2641e9dccafc2acc6faa4e95889b3ce0564b09a305867e1236831af2ab5adff43e4c667d1f2b274c90dd8ffcd5e84038063976b45590dd319fa',
        'kauan@email.com',
        '2000-05-12',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.freepik.com%2Ffotos-vetores-gratis%2Fuser-icon&psig=AOvVaw3yRHyWuHpKxV5EdOsyqUDw&ust=1748875350026000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDYosW60I0DFQAAAAAdAAAAABAE',
        'Sim'
    );

INSERT INTO tbl_categoria (nome, descricao, sigla) VALUES
('Trânsito', 'Problemas relacionados ao trânsito e tráfego local', 'TR'),
('Buraco na Rua', 'Buracos em vias públicas que atrapalham o tráfego', 'BR'),
('Falta de Energia', 'Queda ou ausência de energia elétrica', 'FE'),
('Falta de Água', 'Desabastecimento de água na região', 'FA'),
('Esgoto', 'Problemas com esgoto a céu aberto ou vazamentos', 'EG');

-- São Paulo - SP
INSERT INTO tbl_endereco (
    cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, siafi, display_name, lat, lon
) VALUES (
    '01001-000', 'Praça da Sé', NULL, 'Sé', 'São Paulo', 'SP', '3550308', '1004', '7107',
    'Praça da Sé, Sé, São Paulo - SP, Brasil', -23.5505200, -46.6333080
);

-- Rio de Janeiro - RJ
INSERT INTO tbl_endereco (
    cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, siafi, display_name, lat, lon
) VALUES (
    '20040-010', 'Rua da Assembleia', NULL, 'Centro', 'Rio de Janeiro', 'RJ', '3304557', '', '6001',
    'Rua da Assembleia, Centro, Rio de Janeiro - RJ, Brasil', -22.9035393, -43.1766326
);

-- Salvador - BA
INSERT INTO tbl_endereco (
    cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, siafi, display_name, lat, lon
) VALUES (
    '40020-000', 'Avenida Sete de Setembro', NULL, 'Vitória', 'Salvador', 'BA', '2927408', '', '3849',
    'Avenida Sete de Setembro, Vitória, Salvador - BA, Brasil', -12.9713917, -38.5010986
);

-- Curitiba - PR
INSERT INTO tbl_endereco (
    cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, siafi, display_name, lat, lon
) VALUES (
    '80010-000', 'Rua XV de Novembro', NULL, 'Centro', 'Curitiba', 'PR', '4106902', '', '7535',
    'Rua XV de Novembro, Centro, Curitiba - PR, Brasil', -25.4295963, -49.2712724
);

-- Fortaleza - CE
INSERT INTO tbl_endereco (
    cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, siafi, display_name, lat, lon
) VALUES (
    '60025-060', 'Rua Senador Pompeu', NULL, 'Centro', 'Fortaleza', 'CE', '2304400', '', '5601',
    'Rua Senador Pompeu, Centro, Fortaleza - CE, Brasil', -3.7318616, -38.5266704
);


INSERT INTO tbl_noticia (titulo, conteudo, data_postagem, tbl_usuario_id, tbl_endereco_id) VALUES
('Engarrafamento na Rua das Acácias', 'Trânsito completamente parado desde as 7h.', '2025-05-31', 1, 1),
('Buraco perigoso na Avenida Brasil', 'Buraco fundo e sem sinalização causa riscos a motoristas.', '2025-05-30', 1, 2),
('Bairro sem energia há mais de 12h', 'Moradores relatam queda desde ontem à noite.', '2025-05-29', 1, 3),
('Interrupção no fornecimento de água', 'Problema na tubulação afeta diversos bairros.', '2025-05-28', 1, 4);


INSERT INTO tbl_noticia_categoria (tbl_noticia_id, tbl_categoria_id) VALUES
(1, 1), -- Trânsito
(2, 2), -- Buraco na Rua
(3, 3), -- Falta de Energia
(4, 4); -- Falta de Água



INSERT INTO tbl_midia (url_midia, tbl_noticia_id) VALUES
('https://imagens.ebc.com.br/dGtbGdpmZBPIbIqV-_TsG8Xnxn4=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2024/11/08/transito_chuva_06.jpg?itok=ngIr9diS', 1),
('https://s2-autoesporte.glbimg.com/IlQuu--qqq9LFLUi6qCdvfdmOYk=/0x0:3200x2004/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/e/R/gSPPBXTC6dO3lVwwNT7g/catsvaii.jpg', 1),
('https://img.nsctotal.com.br/wp-content/uploads/2023/05/AdobeStock_282004392-800x531.jpeg', 2),
('https://imgs.jusbr.com/publications/images/4a314da9761c57ac02539406e54d29d3', 3),
('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgy8eXz4QjEjkXYuR9zKi3NLaqEM4e53o_UeZKHHVYQ_qMXJzBDz019VvXdcMU11Y8dSttueTsSyprx-ErBXv4FgLxQejToV50-RTQT0sNxo3uYazlqWQy9j6JQ5wBj649PidJnVR8QOGYG3gLKODX6AO200ooWw2OrHNUQcwnCfWblX1zkjzVkAS8_Ns2O/s1024/torneira-sem-%C3%A1gua.jpg', 4);


 
INSERT INTO tbl_comentarios (conteudo, data, tbl_noticia_id) VALUES
('Excelente matéria, muito informativa!', '2025-06-01', 1),
('Não concordo com o ponto de vista apresentado.', '2025-06-02', 1),
('Parabéns pela reportagem!', '2025-06-03', 2),
('Faltou aprofundar mais sobre o tema.', '2025-06-04', 2),
('Gostei muito da abordagem da notícia.', '2025-06-05', 3);
