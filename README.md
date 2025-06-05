<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=4B0082&height=120&section=header"/>

<h1 align="center">📰 Reporter do Bairro — API Back-End</h1>
<p align="center"><i>Sua voz ativa para melhorar o bairro onde vive!</i></p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-%5E4.18-blue?logo=express" />
  <img src="https://img.shields.io/badge/Prisma-ORM-blueviolet?logo=prisma" />
  <img src="https://img.shields.io/badge/Firebase-Admin-yellow?logo=firebase" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" />
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-orange" />
</p>

---

## 🎯 Objetivo

O **Reporter do Bairro** é um sistema que permite que cidadãos registrem e acompanhem ocorrências urbanas em suas cidades, como:

- 🕳️ **Buracos nas ruas**  
- 💡 **Problemas de iluminação**  
- 💧 **Vazamentos e falta d'água**  
- ⚡ **Falta de energia**  
- 🚦 **Engarrafamentos e trânsito**  

A API fornece autenticação de usuários, gerenciamento de categorias, localização e integração com interfaces web/mobile.

---

## 🧪 Tecnologias Utilizadas

| 🛠️ Tecnologia                  | 💡 Descrição                                       | 📚 Link Oficial                                         |
|-------------------------------|---------------------------------------------------|--------------------------------------------------------|
| Node.js                       | Ambiente de execução JavaScript no servidor       | [Node.js](https://nodejs.org/en/docs)                  |
| Express                       | Framework web para Node.js                         | [Express](https://expressjs.com/)                      |
| Prisma ORM                    | ORM para modelagem e manipulação do banco de dados| [Prisma](https://www.prisma.io/docs)                   |
| MySQL                         | Banco de dados relacional                          | [MySQL](https://dev.mysql.com/doc/)                    |
| Firebase Admin SDK            | Autenticação de usuários via tokens JWT            | [Firebase](https://firebase.google.com/docs/admin)     |
| dotenv                        | Gerenciamento de variáveis de ambiente             | [dotenv](https://www.npmjs.com/package/dotenv)         |
| CORS                          | Permissão de comunicação entre origens distintas   | [cors](https://www.npmjs.com/package/cors)             |

---

## 🚀 Como rodar o projeto

```bash
# 1. Clone o repositório
git clone [https://github.com/seu-usuario/reporter-do-bairro-backend.git](https://github.com/moh4b-z/API-reporter-do-bairro)
cd API-reporter-do-bairro

# 2. Instale as dependências
npm install

# 3. Configure o Prisma e o banco de dados
npm install prisma @prisma/client --save
npx prisma db pull
npx prisma generate

# 4. Rode o servidor
npm run dev

```


<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=4B0082&height=120&section=footer"/>
