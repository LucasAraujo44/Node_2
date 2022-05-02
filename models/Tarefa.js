const mongoose = require('mongoose')

const Tarefa = mongoose.model('Tarefa', {
    descricao: String,
    endereco: String,
    idPessoa: String
    
})

module.exports = Tarefa