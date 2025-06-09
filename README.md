<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=4B0082&height=120&section=header"/>


<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?color=8A2BE2&size=25&center=true&vCenter=true&width=1000&lines=Bem-vindo+ao+Reporter+do+Bairro!;Uma+API+para+melhorar+sua+cidade.;Registre+ocorrências+urbanas+com+facilidade.;Buracos,+iluminação,+trânsito+e+mais.;Projeto+desenvolvido+por+alunos+do+Senai+Jandira.;Tecnologias+modernas+e+colaboração+efetiva.;Obrigado+por+visitar!+%F0%9F%8C%9F" alt="Typing SVG" />
</p>

<br />

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18.17.1-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-v4.18.2-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Admin-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/MySQL-8.0-00758F?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Dotenv-env-8A2BE2?style=for-the-badge&logo=dotenv&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-FFA500?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-4B0082?style=for-the-badge" />
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
node ./app.js

```


<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=4B0082&height=120&section=footer"/>
