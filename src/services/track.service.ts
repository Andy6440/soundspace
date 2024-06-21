import { config } from '../config/config';
import { Track, userSavedTracks } from '../interfaces/track.interface';
import {
  handleTrack,
  handleuserSavedTracks,
} from '../utils/transformers/track.transformer';

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
      console.log('url', url);
      const response: Track = await httpService.get(url, access_token);
      return handleTrack(response);
    } catch (error) {
      throw new Error('Error al hacer la solicitud');
    }
  }

  public async getSeveralTracks(access_token: string, ids: string[]) {
    try {
      const url = `${config.api_spotify_url}/tracks?ids=${ids.join()}`;
      console;
      const response: Track = await httpService.get(url, access_token);
      return handleTrack(response);
    } catch (error) {
      throw new Error('Error al hacer la solicitud');
    }
  }
  public async getUsersSavedTracks(
    access_token: string,
    limit: string,
    offset: string,
  ) {
    try {
      const params = new URLSearchParams({
        offset: offset && offset !== '' ? offset.toString() : '0',
        limit: limit && limit !== '' ? limit.toString() : '20',
      });
      const url = `${config.api_spotify_url}/me/tracks?${params.toString()}`;
      const response: userSavedTracks = await httpService.get(
        url,
        access_token,
      );
      const data = handleuserSavedTracks(response);
      return data;
    } catch (error) {
      throw new Error('Error al hacer la solicitud');
    }
  }
}

export const trackService = TrackService.getInstance();
