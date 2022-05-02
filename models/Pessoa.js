const mongoose = require('mongoose')// importa o mongoose
const { stringify } = require('nodemon/lib/utils')  // 

const Pessoa = mongoose.model('Pessoa', { // informa os tipos de dados 
    name: String,
    cpf: String,
    birtDate: String,
    email: String,
    password: String,
    address: String,
    number: String,
    complement: String,
    city: String,
    state: String,
    country: String,
    zipCop: String
})

module.exports = Pessoa // exporta o modulo pessoa