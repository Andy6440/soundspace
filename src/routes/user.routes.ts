import express from "express";
import { UserController } from "../controllers/user.controller";
import validateParams from "../middlewares/validations/params.validation";
import validateOptionalParams from "../middlewares/validations/optionalParams.validation";

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
userRoutes.get("/me/top",validateParams(['type']) ,validateOptionalParams(['time_range','limit','offset']), UserController.getTopByType);

export default userRoutes;
