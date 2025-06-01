#  `Reporter do Bairro`
### Back-End

## Objetivo
Este back-end fornece uma API para permitir que cidadãos registrem e acompanhem ocorrências urbanas em suas cidades, como buracos nas ruas, problemas de iluminação, vazamentos, entre outros. A API também permite autenticação de usuários e comunicação com o front-end web/mobile.

---

##  Tecnologias Utilizadas

| Tecnologia                     | Descrição                                                                 | Documentação Oficial                                     |
|-------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------|
| [Node.js](https://nodejs.org/)        | Ambiente de execução JavaScript no servidor                            | https://nodejs.org/en/docs                              |
| [Express](https://expressjs.com/)     | Framework web para Node.js                                              | https://expressjs.com/en/starter/installing.html        |
| [Prisma ORM](https://www.prisma.io/) | ORM para modelagem e comunicação com o banco de dados MySQL            | https://www.prisma.io/docs                              |
| [MySQL](https://www.mysql.com/)       | Banco de dados relacional                                               | https://dev.mysql.com/doc/                              |
| [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) | Autenticação de usuários (validação de tokens)           | https://firebase.google.com/docs/auth                   |
| [dotenv](https://www.npmjs.com/package/dotenv) | Gerenciamento de variáveis de ambiente                    | https://www.npmjs.com/package/dotenv                     |
| [Cors](https://www.npmjs.com/package/cors) | Permite comunicação entre servidores                      | https://www.npmjs.com/package/cors                       |


---

## 👥 Membros da Equipe

- Fernando Baliano (Dev Mobile)
- [Kaike Bueno](https://www.linkedin.com/in/kaike-bueno-3b10a82b1/) (Dev Back-end)
- [Kauan de Assis](https://github.com/kauanmlk9860) (DBA)
- [Mohammad Salim](https://www.linkedin.com/in/mohammad-salim-197481320/) (Tech Lead)
- Richard (Dev Front-end)

---

## Como rodar o projeto

```bash
# Instale as dependências
npm install
npm install prisma --save
npm install @prisma/client --save
npx prisma db pull
npx prisma generate



