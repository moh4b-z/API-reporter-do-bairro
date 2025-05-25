/*************************************************************************
Versão: 1.0
* Observação:
**********  Para configurar e instalar a API, precisamos das 
            seguintes bibliotecas:
                express         npm install express --save 
                cors            npm install cors --save 
                body-parser     npm install body-parser --save   
**********  Para configurar e instalar o acesso ao Banco de Dados, 
            precisamos baixar:
                prisma          npm install prisma --save (conexão com o BD)
                prisma/client   npm install @prisma/client --save   (Executa scripts no BD)

            Após a instalação completa do Prisma, deve rodar:
                comando         npx prisma init

            Para realizar o sincronismo do Prisma com o BD, devemos executar o seguinte comando:
                comando         npx prisma migrate dev
************************************************************************/

const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use(cors()) 
app.use(bodyParser.json()) 

// Importação de rotas

const routesMain = require('./src/routes/MainRoutes')

// Definição das rotas
app.use("/v1/bairro-news", routesMain)


const port = process.env.PORT || 8080
app.listen(port, function(){
    console.log(`API aguardando requisição na porta ${port}...`)
})
