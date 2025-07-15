const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../models/user');
const pool = require('../db');

beforeAll(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE
    );
  `);
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
  await pool.query('DROP TABLE IF EXISTS users CASCADE');
  await pool.end();
});

test('createUser creates a new user', async () => {
  const user = await createUser('John Doe', 'john@example.com');
  expect(user).toHaveProperty('id');
  expect(user.name).toBe('John Doe');
  expect(user.email).toBe('john@example.com');
});

test('getUserById returns a user', async () => {
  const user = await createUser('Jane Doe', 'jane@example.com');
  const found = await getUserById(user.id);
  expect(found.email).toBe('jane@example.com');
});

test('deleteUser removes a user', async () => {
  const user = await createUser('ToDelete', 'delete@example.com');
  await deleteUser(user.id);
  const found = await getUserById(user.id);
  expect(found).toBeUndefined();
});
