import { Artist } from "../../interfaces/artist.interface";
import { Track } from "../../interfaces/track.interface";
import { User, UserTop } from "../../interfaces/user.interface";
import { handleArtist } from "./artist.transformer";
import { handleTrack } from "./track.transformer";

/**
 * Transforms user data by selecting specific properties.
 * @param user - The user object to be transformed.
 * @returns The transformed user object.
 */
const handleUserData = (user: User): User => {
    return {
        // id: user.id,
        display_name: user.display_name,
        external_urls: user.external_urls,
        followers: user.followers,
        href: user.href,
        images: user.images,
        type: user.type,
        uri: user.uri,
        email: user.email,
        explicit_content: user.explicit_content,
        access_token: user.access_token ,        
    };
}

const handleUserTop = (data: UserTop): UserTop => {

    let result  = [] as (Track | Artist)[]

    if (data.items.length > 0) {
        data.items.forEach((item) => {
            if (item.type === 'track') {
                let track : Track = handleTrack(handleTrack) 
                result.push(track)
              

            } else {
                let artist:Artist = handleArtist(item)               
                result.push(artist)
            }
        })
    }
    let response = {
        items: result
    } as UserTop
    
    return response
}

export { handleUserData,handleUserTop };