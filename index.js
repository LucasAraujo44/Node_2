const express = require('express')
const mongoose = require('mongoose') // importa o mongoose
const app = express() // importa o app para depois chamarmos no app.use
const pessoaRoutes = require('./routes/pessoaRoutes')// faz o import do mesmo nivel da pasta routes arquivo pessoaRoutes
const tarefaRoutes = require('./routes/tarefaRoutes') // faz o import do mesmo nivel da pasta routes arquivo tarefasRoutes

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use('/pessoa', pessoaRoutes)// quando chegar na funcao tarefa ele vai encaminhar para pessoaRoutes

app.use('/tarefa', tarefaRoutes)// quando chegar na funcao tarefa ele vai encaminhar para tarefasRoutes

mongoose.connect('mongodb+srv://cadastroUser:bziueg3ecrbCwjzJ@apicuster.o7ihy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority') //metodo connect do mongoose
    .then(() => { // promessas de quanto dá certo
        console.log('Conexão ao mongo atlas com sucesso!')
        app.listen(3000)
    })
    .catch((err) => console.log(err)) // promessas de quanto dá errado