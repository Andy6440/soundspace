import axios from "axios";
import { config } from "../config/config";

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
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
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
   * @returns A Promise that resolves to the response data.
   */
  public async post(path: string, data?: object) {
    const response = await this.axiosInstance.post(path, data);
    console.log(response.data);
    return response.data;
  }
}

export const httpService = new HttpService();
