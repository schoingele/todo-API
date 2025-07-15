const pool = require('../db');

async function getAllTasks() {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
}

async function getTaskById(id) {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0];
}

async function getTasksByUserId(userId) {
  const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
  return result.rows;
}

async function createTask(title, user_id) {
  const result = await pool.query(
    'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *',
    [title, user_id]
  );
  return result.rows[0];
}

async function updateTask(id, title) {
  const result = await pool.query(
    'UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *',
    [title, id]
  );
  return result.rows[0];
}

async function deleteTask(id) {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
}

module.exports = {
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
};