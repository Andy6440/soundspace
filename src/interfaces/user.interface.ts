import { Artist } from "./artist.interface";
import { Image } from "./common/common.interface";
import { Track } from "./track.interface";

export interface AccessToken {
   
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export interface IAuth {
    getAccessToken(code: string): Promise<AccessToken>;
}        

export interface User {
    display_name: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href?: any;
        total: number;
    };
    href: string;
    
    images: Image[];
    type: string;
    uri: string;
    email: string;
    explicit_content : {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    access_token: AccessToken;

}
export interface UserTop {
    items: Artist[] | Track[];
}

