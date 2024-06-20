import { Artist } from "../../interfaces/artist.interface";

export const handleArtist = (data: any): Artist => {
    return {
        external_urls:data.external_urls,
        followers: data.followers,
        genres: data.genres,
        href: data.href,
        id: data.id,
        images: data.images,
        name: data.name,
        popularity: data.popularity,
        type: data.type,
        uri: data.uri,
    };
}