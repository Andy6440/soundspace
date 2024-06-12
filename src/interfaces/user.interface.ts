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