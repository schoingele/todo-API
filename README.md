
# Todo API Node Puro

## Descrição

API RESTful implementada em Node.js puro (sem frameworks como Express), com persistência em PostgreSQL.  
Contém duas entidades: `User` e `Task`, com relacionamento de um-para-muitos (cada task pertence a um user).

## Requisitos

- Node.js instalado
- PostgreSQL instalado e rodando
- pgAdmin para gerenciamento opcional

## Instalação

1. Clone o repositório ou descompacte este projeto.
2. Rode `npm install` para instalar dependências.

## Configuração do banco

1. Crie o banco de dados `todo_db` no PostgreSQL.
2. Crie as tabelas executando este comando SQL no pgAdmin ou psql:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  user_id INTEGER REFERENCES users(id)
);
```

3. Atualize o arquivo `db.js` com seu usuário, senha e host do PostgreSQL.

## Como rodar

Execute:

```
npm start
```

Servidor rodará em http://localhost:3000

## Rotas

- GET /users - lista todos usuários
- GET /users/:id - busca usuário por id
- POST /users - cria usuário (body JSON com name e email)
- PUT /users/:id - atualiza usuário (body JSON com name e email)
- DELETE /users/:id - apaga usuário

- GET /tasks - lista todas tarefas
- GET /tasks/:id - busca tarefa por id
- POST /tasks - cria tarefa (body JSON com title e user_id)
- PUT /tasks/:id - atualiza tarefa (body JSON com title)
- DELETE /tasks/:id - apaga tarefa

## Testes

Rode:

```
npm test
```

## Usando pgAdmin

1. Abra o pgAdmin.
2. Conecte no seu servidor PostgreSQL.
3. Navegue até o banco `todo_db`.
4. Visualize as tabelas `users` e `tasks`.
5. Você pode rodar queries SQL diretamente, inserir, editar ou deletar dados pela interface gráfica.

---

Se quiser, posso te ajudar com comandos específicos para rodar no pgAdmin, só pedir!
