const Pessoa = require('../models/Pessoa')

exports.ConsultarTodos = async (req, res) => {
    try {
        const pessoas = await Pessoa.find() // espera os dados como await dps o metodo find garante que todos os dados sejam retornados
        res.status(200).json(pessoas)
    } catch (error) {
        res.status(404).json({ error: error }) // alterar aqui 
    }
}

exports.ConsultarPorId = async (req, res) =>{
    try {
        const id = req.params.id;
        const pessoa = await Pessoa.findOne({ _id: id })

        if (!pessoa) {
            res.status(404).json({ body: 'Registro não encontrado para o id: ' + id })
            return
        }

        res.status(200).json(pessoa)

    } catch (error) {
        res.status(500).json({ error: error })
    }
}