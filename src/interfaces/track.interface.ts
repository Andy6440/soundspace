import { ExternalUrl, Image } from './common/common.interface';
interface TArtist {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: TArtist[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Track {
  album: Album;
  artists: TArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface userSavedTracks {
  href: string;
  items: Track[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface AudioFeatures {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: string;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
}
