import { Request, Response } from 'express';
import { generateRandomString } from '../utils/string.utils';
import { AuthController } from '../controllers/auth.controller';
jest.mock('../src/utils/string.utils', () => ({
  generateRandomString: jest.fn(),
}));

jest.mock('../src/config/config', () => ({
  config: {
    client_id: 'test_client_id',
    redirect_uri: 'http://localhost/callback',
  },
}));

describe('AuthController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      redirect: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  describe('handleLogin', () => {
    it('should generate a random state and redirect to authorization URL', async () => {
      // Configurar el mock de generateRandomString
      (generateRandomString as jest.Mock).mockReturnValue('random_state');

      // Llamar al método handleLogin
      await AuthController.handleLogin(req as Request, res as Response);

      // Verificar que generateRandomString fue llamado con el valor correcto
      expect(generateRandomString).toHaveBeenCalledWith(16);

      // Verificar que res.redirect fue llamado con la URL correcta
      const expectedUrl =
        'https://accounts.spotify.com/authorize?response_type=code&client_id=test_client_id&scope=user-read-private+user-read-email&redirect_uri=http%3A%2F%2Flocalhost%2Fcallback&state=random_state';
      expect(res.redirect).toHaveBeenCalledWith(expectedUrl);
    });
  });
});
