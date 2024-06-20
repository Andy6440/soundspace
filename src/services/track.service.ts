import { config } from '../config/config';
import { Track } from '../interfaces/track.interface';
import { handleTrack } from '../utils/transformers/track.transformer';

import { httpService } from './http.service';

/**
 * Represents a service for managing user-related operations.
 */
class TrackService {
  private static instance: TrackService; // Private static property to hold the instance

  /**
   * Returns the singleton instance of the TrackService class.
   * @returns The singleton instance of the TrackService class.
   */
  public static getInstance(): TrackService {
    if (!TrackService.instance) {
      TrackService.instance = new TrackService();
    }
    return TrackService.instance;
  }

  /**
   * Retrieves user data using the provided access token.
   * @param access_token - The access token for authentication.
   * @returns A promise that resolves to the user data.
   * @throws An error if there is an issue with the request.
   */
  public async getById(access_token: string, id: string) {
    try {
      const url = `${config.api_spotify_url}/tracks/${id}`;
      const response: Track = await httpService.get(url, access_token);
      return handleTrack(response);
    } catch (error) {
      throw new Error('Error al hacer la solicitud');
    }
  }
}

export const trackService = TrackService.getInstance();
