const router = require('express').Router()// chama o router no express e com Router utilizo para redicrecionar
const Pessoa = require('../models/Pessoa')// importa o arquivo Pessoa 
const pessoaService = require('../services/pessoaService')

router.post('/', async (req, res) => { // vamos criar esses dados no sistemas, '/' padrao rest

    const {name,cpf, birthDate, email, password, address, number, complement, city, state, country, zipCode } = req.body

    if(!name,!cpf, !birthDate, !email, !password, !address, !number, !complement, !city, !state, !country, !zipCode){
        res.status(422).json({error: 'Todos os campos são obrigatorio'})
    }

    const pessoa = {
        name,cpf,birthDate,email,password,address,number,complement, city, state, country, zipCode 
    }
    try { 
        await Pessoa.create(pessoa)// o await espera a requisicao terminar e com o metodo create vamos criar os dados da const pessoa
        res.status(201).json(pessoa) // mensagem de que a requisicao foi criado com sucesso(201)
    } catch (error) {// caso de erro na requisicao ele vai mostar o status abaixo
        res.status(500).json({ error: error }) // caso a requisicao de errado/ erro de servidor(500)
    }
})

router.get('/', pessoaService.ConsultarTodos) // encaminhar para consultar todos
router.get('/:id', pessoaService.ConsultarPorId) // encaminhar para ConsultarPorId

router.put('/:id', async (req, res) => { // requicicao para atualializar uma pessoa com base em um id existente
    const {name,cpf, birthDate, email, password, address, number, complement, city, state, country, zipCode } = req.body
//o req.body contém pares de valores-chave de dados enviados no corpo da solicitação

    const pessoa = {name, cpf, birthDate, email, password, address, number, complement, city, state, country, zipCode 
    }
    try {
        const id = req.params.id;
        const pessoaAtualizada = await Pessoa.updateOne({ _id: id }, pessoa)// atualiza somente um
        if (pessoaAtualizada.matchedCount === 0) {
            res.status(404).json({ body: 'Registro não encontrado para o id: ' + id })//envia como json e retorna status(404) qnd o usuario não é encontrado
            return
        }
        res.status(200).json(pessoa) // retorna status(200) que a requisicao funcoinou

    } catch (error) {
        res.status(500).json({ error: error })// com o catch pegar o erro e mostra o status(500)
    }
})

router.delete('/:id', async (req, res) => { // endpoint que deleta um usuario somente se possuir id cadastrado
    try {
        const id = req.params.id;// funcao req.params define o caminho do URL que correspondem a um parâmetro na definição de rota
        const pessoa = await Pessoa.deleteOne({ _id: id })// espera a requisicao para depois fazer a busca por id

        if (pessoa.deletedCount === 0) {// se a pessoa informada não tiver id vai informar o status 404
            res.status(404).json({ body: 'Registro não encontrado para o id: ' + id })// se o id for errado informar o status(404) 
            return
        }

        res.status(204).json(pessoa)// se apagar o id retonar o status(204) informando que a requisicao funcionou

    } catch (error) {
        res.status(500).json({ error: error })// se for outro error, catar e informar o status(500) 
    }
})

module.exports = router// exporto o router