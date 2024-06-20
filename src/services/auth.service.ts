import { config } from '../config/config';
import { AccessToken, IAuth } from '../interfaces/user.interface';
import { httpService } from './http.service';

/**
 * Represents the authentication service.
 */
class AuthService implements IAuth {
  private static instance: AuthService; // Private static property to hold the instance

  /**
   * Returns the singleton instance of the AuthService class.
   * @returns The singleton instance of the AuthService class.
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Retrieves an access token using the provided authorization code.
   * @param code - The authorization code.
   * @returns A promise that resolves to the access token.
   * @throws An error if there was an issue making the request.
   */
  public async getAccessToken(code: string): Promise<AccessToken> {
    const params = {
      client_id: config.client_id,
      client_secret: config.client_secret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: config.redirect_uri,
    };
    try {
      const response = (await httpService.post(
        `${config.base_url}/token`,
        params,
      )) as AccessToken;

      return response;
    } catch (error) {
      throw new Error('Error al hacer la solicitud');
    }
  }

  /**
   * Refreshes the access token using the refresh token.
   * @param refreshToken - The refresh token to use for refreshing the access token.
   * @returns A Promise that resolves to the new access token and refresh token.
   */
  public async refreshToken(refreshToken: string): Promise<AccessToken> {
    try {
      const url = `${config.base_url}/token`;

      const data = new URLSearchParams();
      data.append('grant_type', 'refresh_token');
      data.append('refresh_token', refreshToken);

      const authHeader = `Basic ${Buffer.from(
        `${config.client_id}:${config.client_secret}`,
      ).toString('base64')}`;

      const response = (await httpService.post(url, data, {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeader,
      })) as AccessToken;
      return response;
    } catch (error) {
      throw new Error('Error al hacer la solicitud');
    }
  }

  /**
   * Retrieves an access token using the client credentials.
   * @param client_id - The client ID.
   * @param client_secret - The client secret.
   * @returns A promise that resolves to the access token.
   * @throws An error if there was an issue making the request.
   */
  public async getAccessTokenWithClientCredentials(
    client_id: string,
    client_secret: string,
  ): Promise<AccessToken> {
    const authHeader = `Basic ${Buffer.from(
      `${client_id}:${client_secret}`,
    ).toString('base64')}`;
    try {
      const data = new URLSearchParams();
      data.append('grant_type', 'client_credentials');
      const url = `${config.base_url}/token`;

      const response = (await httpService.post(url, data, {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeader,
      })) as AccessToken;
      return response;
    } catch (error) {
      throw new Error('Error al hacer la solicitud');
    }
  }
}

export const authService = AuthService.getInstance();
