const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

router.get('/', tarefaController.listarTarefas);
router.post('/', tarefaController.criarTarefa);
router.get('/:id', tarefaController.buscarTarefa);
router.put('/:id', tarefaController.atualizarTarefa);
router.delete('/:id', tarefaController.deletarTarefa);
router.patch('/:id/concluir', tarefaController.marcarConcluida);

module.exports = router;