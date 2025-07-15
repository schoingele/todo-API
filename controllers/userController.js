const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../models/user');
const { getTasksByUserId } = require('../models/task');

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

async function handleUserRequest(req, res) {
  const urlParts = req.url.split('/');
  let id = urlParts.length > 2 ? urlParts[2] : null;
  if (id === '') id = null;
  if (id) id = Number(id);

  try {
    // Nova rota: /users/:id/tasks
    if (req.method === 'GET' && urlParts.length === 4 && urlParts[3] === 'tasks' && id) {
      const tasks = await getTasksByUserId(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tasks));
      return;
    }

    if (req.method === 'GET') {
      if (id) {
        const user = await getUserById(id);
        if (!user) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        const users = await getAllUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      }
    } else if (req.method === 'POST') {
      const data = await parseRequestBody(req);
      if (!data.name || !data.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Faltando name ou email' }));
        return;
      }
      try {
        const newUser = await createUser(data.name, data.email);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } catch (err) {
        if (err.code === '23505') { // unique_violation
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email já cadastrado' }));
        } else {
          throw err;
        }
      }
    } else if (req.method === 'PUT' && id) {
      const data = await parseRequestBody(req);
      if (!data.name || !data.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Faltando name ou email' }));
        return;
      }
      const updatedUser = await updateUser(id, data.name, data.email);
      if (!updatedUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } else if (req.method === 'DELETE' && id) {
      const user = await getUserById(id);
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
        return;
      }
      await deleteUser(id);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Método não permitido' }));
    }
  } catch (error) {
    console.error('Erro interno:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Erro interno no servidor' }));
  }
}

module.exports = { handleUserRequest };