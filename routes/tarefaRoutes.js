const router = require('express').Router()
const Tarefa = require('../models/Tarefa')
const service = require('../services/tarefaService')

router.post('/', service.CadastrarTarefa)
//router.put('/', service.AtualizarTarefa )

router.put('/:id', async (req, res) => { // requicicao para atualializar uma pessoa com base em um id existente
    const { descricao, endereco, idPessoa } = req.body
    const tarefa = {
        descricao,
        endereco,
        idPessoa
    }
    try {
        const id = req.params.id;
        const tarefaAtualizada = await Tarefa.updateOne({ _id: id }, tarefa)// atualiza somente um
        if (tarefaAtualizada.matchedCount === 0) {
            res.status(404).json({ body: 'Registro não encontrado para o id: ' + id })//envia como json e retorna status(404) qnd o usuario não é encontrado
            return
        }
        res.status(200).json(tarefa) // retorna status(200) que a requisicao funcoinou

    } catch (error) {
        res.status(500).json({ error: error })// com o catch pegar o erro e mostra o status(500)
    }
})

router.delete('/:id', async (req, res) => {
    const { descricao, endereco, idPessoa } = req.body
    const tarefa = {
        descricao,
        endereco,
        idPessoa
    } // endpoint que deleta um usuario somente se possuir id cadastrado
    try {
        const id = req.params.id;// funcao req.params define o caminho do URL que correspondem a um parâmetro na definição de rota
        const tarefa = await Tarefa.deleteOne({ _id: id, })// espera a requisicao para depois fazer a busca por id

        if (tarefa.deletedCount === 0) {// se a pessoa informada não tiver id vai informar o status 404
            res.status(404).json({ body: 'Registro não encontrado para o id: ' + id })// se o id for errado informar o status(404) 
            return
        }

        res.status(204).json(tarefa)// se apagar o id retonar o status(204) informando que a requisicao funcionou

    } catch (error) {
        res.status(500).json({ error: error })// se for outro error, catar e informar o status(500) 
    }
})
module.exports = router
