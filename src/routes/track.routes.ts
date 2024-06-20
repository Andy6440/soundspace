import express from 'express';
import { TrackController } from '../controllers/track.controller';

const trackRoutes = express.Router();

// Routes
trackRoutes.get('/id', TrackController.get);

export default trackRoutes;
