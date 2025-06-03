const tarefaController = require('../src/controllers/tarefaController');

describe('Testes para Tarefas', () => {
  test('Deve listar todas as tarefas', () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    tarefaController.listarTarefas(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          titulo: expect.any(String),
          descricao: expect.any(String),
          status: expect.any(String),
          usuarioId: expect.any(Number)
        })
      ])
    );
  });

  test('Deve retornar 404 se tarefa não existir', () => {
    const req = { params: { id: 999 } }; // ID inexistente
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    tarefaController.buscarTarefa(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensagem: "Tarefa não encontrada" });
  });
});
