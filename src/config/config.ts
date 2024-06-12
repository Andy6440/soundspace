// config.ts
import dotenv from 'dotenv';
dotenv.config();


export const config = {
    redirect_uri: process.env.REDIRECT_URI || 'http://localhost:8888/callback',
    client_id: process.env.CLIENT_ID || '',
    client_secret: process.env.CLIENT_SECRET || '',
    base_url: process.env.BASE_URL || "https://accounts.spotify.com/api",

};
