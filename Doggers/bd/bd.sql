create DATABASE quiz;
use quiz;

CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- ID único para cada registro de nota
    email_usuario VARCHAR(255) NOT NULL,          -- Email do usuário ao qual a nota pertence
    nota DECIMAL(5,2) NOT NULL,                   -- Valor da nota, podendo ter até duas casas decimais
    data_nota TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora em que a nota foi atribuída
    FOREIGN KEY (email_usuario) REFERENCES usuarios(email)
);


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID único para cada usuário
    email VARCHAR(255) NOT NULL UNIQUE,        -- Email do usuário
    senha VARCHAR(255) NOT NULL         -- Senha do usuário (armazenada como hash idealmente)
);

-- CREATE TABLE alunos (
--     id INT AUTO_INCREMENT PRIMARY KEY,  -- ID único para cada usuário
--     email VARCHAR(255) NOT NULL,        -- Email do usuário
--     nome VARCHAR(255) NOT NULL         -- Senha do usuário (armazenada como hash idealmente)
-- );


