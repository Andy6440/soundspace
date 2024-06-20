// @module ./artist-interface
import { ExternalUrl, Followers, Image } from './common/common.interface';
export interface Artist {
  external_urls: ExternalUrl;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
