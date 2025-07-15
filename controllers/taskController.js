const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../models/task');

async function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function handleTaskRequest(req, res) {
  const urlParts = req.url.split('/');
  const id = urlParts.length > 2 ? urlParts[2] : null;

  try {
    if (req.method === 'GET') {
      if (id) {
        const task = await getTaskById(id);
        if (!task) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Tarefa não encontrada' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task));
      } else {
        const tasks = await getAllTasks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
      }
    } else if (req.method === 'POST') {
      const data = await parseRequestBody(req);
      if (!data.title || !data.user_id) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Faltando title ou user_id' }));
        return;
      }
      const newTask = await createTask(data.title, data.user_id);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newTask));
    } else if (req.method === 'PUT' && id) {
      const data = await parseRequestBody(req);
      if (!data.title) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Faltando title' }));
        return;
      }
      const updatedTask = await updateTask(id, data.title);
      if (!updatedTask) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Tarefa não encontrada' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedTask));
    } else if (req.method === 'DELETE' && id) {
      await deleteTask(id);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Método não permitido' }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Erro interno no servidor' }));
  }
}

module.exports = { handleTaskRequest };
