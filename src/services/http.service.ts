import axios from 'axios';

/**
 * Service for making HTTP requests using Axios.
 */
class HttpService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      // baseURL: config.api_spotify_url,
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Sends a GET request to the specified path.
   * @param path - The URL path to send the request to.
   * @param access_token - The access token to include in the request headers.
   * @param params - Optional query parameters to include in the request.
   * @returns A Promise that resolves to the response data.
   */
  async get(path: string, access_token: string, params?: object) {
    const response = await this.axiosInstance.get(path, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  }

  /**
   * Sends a POST request to the specified path.
   * @param path - The URL path to send the request to.
   * @param data - Optional data to include in the request body.
   * @param additionalHeaders - Optional additional headers to include in the request.
   * @returns A Promise that resolves to the response data.
   */
  public async post(
    path: string,
    data?: object,
    additionalHeaders?: Record<string, string>,
  ) {
    const config = {
      headers: {
        ...additionalHeaders,
      },
    };
    const response = await this.axiosInstance.post(path, data, config);
    return response.data;
  }
}

export const httpService = new HttpService();
