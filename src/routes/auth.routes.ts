import express from "express";
import { AuthController } from "../controllers/auth.controller";

/**
 * Express router for handling authentication routes.
 */
const authRoutes = express.Router();

// Routes

/**
 * Route for handling the login process.
 * @route GET /login
 * @handler AuthController.handleLogin
 */
authRoutes.get("/login", AuthController.handleLogin);

/**
 * Route for handling the callback after successful authentication.
 * @route GET /callback
 * @handler AuthController.handleCallback
 */
authRoutes.get("/callback", AuthController.handleCallback);

export default authRoutes;