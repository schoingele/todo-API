const { handleUserRequest } = require('./controllers/userController');
const { handleTaskRequest } = require('./controllers/taskController');

async function router(req, res) {
  if (req.url.startsWith('/users')) {
    await handleUserRequest(req, res);
  } else if (req.url.startsWith('/tasks')) {
    await handleTaskRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
}

module.exports = router;
