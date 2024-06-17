import express from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = express.Router();

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
userRoutes.get("/me/top", UserController.getTopByType);

export default userRoutes;
