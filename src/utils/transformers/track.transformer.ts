// @module ./track-transformer
import {
  AudioFeatures,
  Track,
  userSavedTracks,
} from '../../interfaces/track.interface';

export const handleTrack = (data: any): Track => {
  return {
    album: data.album,
    artists: data.artists,
    disc_number: data.disc_number,
    duration_ms: data.duration_ms,
    explicit: data.explicit,
    external_urls: data.external_urls,
    href: data.href,
    id: data.id,
    is_local: data.is_local,
    name: data.name,
    popularity: data.popularity,
    preview_url: data.preview_url,
    track_number: data.track_number,
    type: data.type,
    uri: data.uri,
  };
};

export const handleuserSavedTracks = (data: any): userSavedTracks => {
  const items = data.items.map((item: any) => handleTrack(item.track));
  return {
    href: data.href,
    items: items,
    limit: data.limit,
    next: data.next,
    offset: data.offset,
    previous: data.previous,
    total: data.total,
  };
};

export const handleAudioFeatures = (data: any): AudioFeatures => {
  return {
    danceability: data.danceability,
    energy: data.energy,
    key: data.key,
    loudness: data.loudness,
    mode: data.mode,
    speechiness: data.speechiness,
    acousticness: data.acousticness,
    instrumentalness: data.instrumentalness,
    liveness: data.liveness,
    valence: data.valence,
    tempo: data.tempo,
    type: data.type,
    id: data.id,
    uri: data.uri,
    track_href: data.track_href,
    analysis_url: data.analysis_url,
    duration_ms: data.duration_ms,
    time_signature: data.time_signature,
  };
};

export const handleAudioFeaturesArray = (data: any): AudioFeatures[] => {
  return data.audio_features.map((item: any) => handleAudioFeatures(item));
};
