import express from "express";
import { AuthController } from "../controllers/auth.controller";

// Create a new express application instance
const authRoutes = express.Router();

// Routes
authRoutes.get("/login", AuthController.handleLogin);
authRoutes.get("/callback", AuthController.handleCallback);

export default authRoutes;