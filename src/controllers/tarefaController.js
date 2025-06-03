let { tarefas } = require('./usuarioController')

exports.listarTarefas = (req, res) => {
  res.json(tarefas);
};

exports.criarTarefa = (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    status: "pendente",
    usuarioId: req.body.usuarioId
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
};

exports.buscarTarefa = (req, res) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!tarefa) return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  res.json(tarefa);
};

exports.atualizarTarefa = (req, res) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!tarefa) return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  
  tarefa.titulo = req.body.titulo || tarefa.titulo;
  tarefa.descricao = req.body.descricao || tarefa.descricao;
  tarefa.status = req.body.status || tarefa.status;
  
  res.json(tarefa);
};

exports.deletarTarefa = (req, res) => {
  const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  
  tarefas.splice(index, 1);
  res.status(204).send();
};

exports.marcarConcluida = (req, res) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!tarefa) return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  
  tarefa.status = "concluída";
  res.json(tarefa);
};

const { usuarios } = require('./usuarioController');

exports.listarTarefasUsuario = (req, res) => {
  const usuarioId = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === usuarioId);

  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  const tarefasUsuario = tarefas.filter(t => t.usuarioId === usuarioId);
  res.json(tarefasUsuario);
};


