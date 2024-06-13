import axios from "axios";
import { config } from "../config/config";

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
  async get(path: string,access_token:string, params?: object) {
    
    const response = await this.axiosInstance.get(path, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });  
    return response.data;
  }

  public async post(path: string, data?: object) {
    const response = await this.axiosInstance.post(path, data);
    console.log(response.data);
    return response.data;
  }
}

export const httpService = new HttpService();
