import express from 'express';
import { TrackController } from '../controllers/track.controller';
import {
  validateArrayString,
  validateParams,
} from '../middlewares/validations/params.validation';
import validateOptionalParamsNumber from '../middlewares/validations/params.integer.notRequired.validation';

const trackRoutes = express.Router();

// Routes
trackRoutes.get('/id', validateParams(['id']), TrackController.get);
trackRoutes.get(
  '/get-several-tracks',
  validateArrayString(['ids']),
  TrackController.getSeveralTracks,
);

trackRoutes.get(
  '/get-users-saved-tracks',
  validateOptionalParamsNumber(['limit', 'offset']),
  TrackController.getUsersSavedTracks,
);

export default trackRoutes;
