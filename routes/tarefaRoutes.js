const router = require('express').Router()
const Tarefa = require('../models/Tarefa')
const service = require('../services/tarefaService')

router.post('/', service.CadastrarTarefa)

module.exports = router
