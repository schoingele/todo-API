const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../models/task');
const pool = require('../db');

beforeAll(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100),
      user_id INTEGER REFERENCES users(id)
    );
  `);
});

afterAll(async () => {
  await pool.query('DROP TABLE IF EXISTS tasks');
  await pool.end();
});

test('createTask creates a new task', async () => {
  const task = await createTask('Task 1', 1);
  expect(task).toHaveProperty('id');
  expect(task.title).toBe('Task 1');
  expect(task.user_id).toBe(1);
});

test('getTaskById returns a task', async () => {
  const task = await createTask('Task 2', 1);
  const found = await getTaskById(task.id);
  expect(found.title).toBe('Task 2');
});

test('deleteTask removes a task', async () => {
  const task = await createTask('Task to delete', 1);
  await deleteTask(task.id);
  const found = await getTaskById(task.id);
  expect(found).toBeUndefined();
});
