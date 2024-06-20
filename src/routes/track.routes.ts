import express from 'express';
import { TrackController } from '../controllers/track.controller';
import validateParams from '../middlewares/validations/params.validation';

const trackRoutes = express.Router();

// Routes
trackRoutes.get('/id', validateParams(['id']), TrackController.get);
trackRoutes.get(
  '/get-several-tracks',

  TrackController.getSeveralTracks,
);

export default trackRoutes;
