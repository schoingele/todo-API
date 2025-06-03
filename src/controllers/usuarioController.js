let usuarios = [
  { id: 1, nome: "João Silva", email: "joao@email.com" },
  { id: 2, nome: "Maria Souza", email: "maria@email.com" }
];

let tarefas = [
  { id: 1, titulo: "Estudar Node", descricao: "Praticar REST APIs", status: "pendente", usuarioId: 1 },
  { id: 2, titulo: "Fazer compras", descricao: "Comprar itens do mês", status: "concluída", usuarioId: 2 }
];

exports.listarUsuarios = (req, res) => {
  res.json(usuarios);
};

exports.criarUsuario = (req, res) => {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: req.body.nome,
    email: req.body.email
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
};

exports.buscarUsuario = (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });
  res.json(usuario);
};

exports.atualizarUsuario = (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });
  
  usuario.nome = req.body.nome || usuario.nome;
  usuario.email = req.body.email || usuario.email;
  
  res.json(usuario);
};

exports.deletarUsuario = (req, res) => {
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: "Usuário não encontrado" });
  
  usuarios.splice(index, 1);
  res.status(204).send();
};

exports.listarTarefasUsuario = (req, res) => {
  const usuarioId = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === usuarioId);
  
  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }
  
  const tarefasUsuario = tarefas.filter(t => t.usuarioId === usuarioId);
  res.json(tarefasUsuario);
};