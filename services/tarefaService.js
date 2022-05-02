const Pessoa = require('../models/Pessoa')
const Tarefa = require('../models/Tarefa')

exports.CadastrarTarefa = async (req, res) => {
    const { descricao, endereco, idPessoa } = req.body
    const tarefa = {
        descricao,
        endereco,
        idPessoa
    }
        try {
            const pessoa = await Pessoa.findOne({ _id: idPessoa}) // espera o result do bd para mostar apenas aquele que possui o id pesquisado

            if (!pessoa) {
                res.status(404).json({ body: 'Registro não encontrado para o id: ' + idPessoa })
                return
            
            }
        await Tarefa.create(tarefa)
        res.status(201).json(tarefa)

    } catch (error) {
        res.status(500).json({ error: error })
    }
}