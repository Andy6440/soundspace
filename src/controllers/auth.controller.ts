import express, { NextFunction, Request, Response, response } from "express";
import { generateRandomString } from '../utils/string.utils';
import { AccessToken } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { config } from "../config/config";
import axios from "axios";
import { userService } from "../services/user.service";
export class AuthController  {

    static async handleLogin(req: Request, res: Response) {
      var state = generateRandomString(16);
      var scope = 'user-read-private user-read-email';
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: config.client_id,
        scope: scope,
        redirect_uri: config.redirect_uri,
        state: state,
      });
    
      const authorizationUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
      console.log('authorization url',authorizationUrl);
      res.redirect(authorizationUrl);
    }

     static async handleCallback(req: Request, res: Response, next: NextFunction) {
      try {
          let tokens: AccessToken  
          if (req?.cookies?.tokens) {
              tokens = req.cookies.tokens as AccessToken
          } else {

              const code = req.query.code as string
              //Get access token
              tokens = await authService.getAccessToken(code)
              const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second
              res.cookie('tokens', tokens, { maxAge: oneDayInMilliseconds });


          }
          //Get user profile
          const user = await userService.get(tokens.access_token)
          // //Save user in DB
          // const user = await UserService.handleUser(profile, tokens)
          // //Send user profile
          // res.send(user)

          res.send(user)
      } catch (err) {
        next(err)
      }
    }
      

}


