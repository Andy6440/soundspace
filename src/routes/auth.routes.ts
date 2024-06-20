import express from 'express';
import { AuthController } from '../controllers/auth.controller';

/**
 * Express router for handling authentication routes.
 */
const authRoutes = express.Router();

// Routes

/**
 * @openapi
 * /login:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Initiates the Spotify login process.
 *     description: Redirects the user to the Spotify authorization page to grant access.
 *     responses:
 *       302:
 *         description: Redirect to Spotify authorization URL.
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: The Spotify authorization URL.
 */
authRoutes.get('/login', AuthController.handleLogin);

/**
 * @openapi
 * /callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Handles the Spotify authentication callback.
 *     description: Processes the authorization code received from Spotify, retrieves user information, and stores necessary data.
 *     parameters:
 *       - name: code
 *         in: query
 *         description: Authorization code received from Spotify.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data successfully retrieved and stored.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' // Reference to your User schema
 *       400:
 *         description: Bad request. Missing or invalid authorization code.
 *       500:
 *         description: Internal server error during authentication process.
 */
authRoutes.get('/callback', AuthController.handleCallback);

/**
 * @openapi
 * /refresh_token:
 *   get:
 *     tags: [Authentication]
 *     summary: Refreshes an access token using a refresh token.
 *     description: Obtains a new access token using a valid refresh token.
 *     parameters:
 *       - name: refresh_token
 *         in: query
 *         description: The refresh token for obtaining a new access token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully refreshed access token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessToken'
 *       400:
 *         description: Bad request. Missing or invalid refresh token.
 *       401:
 *         description: Unauthorized. Refresh token has expired or is invalid.
 */
authRoutes.get('/refresh_token', AuthController.handleRefreshToken);

/**
 * @openapi
 * /login/client_credential:
 *   get:
 *     tags: [Authentication]
 *     summary: Login using client credentials.
 *     description: This endpoint is typically used for server-to-server communication.
 *     responses:
 *       200:
 *         description: Successfully generated access token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessToken'
 *       500:
 *         description: Internal server error during token generation.
 */
authRoutes.get(
  '/login/client_credential',
  AuthController.handleLoginWithClientCredentials,
);

export default authRoutes;
