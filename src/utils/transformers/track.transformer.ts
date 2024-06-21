// @module ./track-transformer
import { Track, userSavedTracks } from '../../interfaces/track.interface';

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
