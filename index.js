//Configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const port = process.env.PORT || 3000


//Forma de ler JSON - middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({
        message: 'Oi express!!!'
    })
})

//entregr uma porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.
    connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.zxqkai9.mongodb.net/bancoAPI?retryWrites=true&w=majority`)
    .then(() =>{
        console.log('Conectamos ao Mongo')
        app.listen(port)
    })
    .catch((err) => console.log(err))
