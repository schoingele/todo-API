const usuarioController = require('../src/controllers/usuarioController');

describe('Testes para Usuários', () => {
  test('Deve listar todos os usuários', () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    
    usuarioController.listarUsuarios(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String)
        })
      ])
    );
  });

  test('Deve retornar 404 se usuário não existir', () => {
    const req = { params: { id: 999 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    usuarioController.buscarUsuario(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});