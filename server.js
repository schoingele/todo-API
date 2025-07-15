const http = require('http');
const router = require('./routes');

const server = http.createServer(async (req, res) => {
  await router(req, res);
});

server.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
