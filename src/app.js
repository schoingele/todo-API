const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/tarefas', tarefaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});