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

trackRoutes.post(
  '/save-track-user',
  validateArrayString(['ids']),
  TrackController.saveTrackUser,
);

trackRoutes.delete(
  '/remove-track-user',
  validateArrayString(['ids']),
  TrackController.removeTrackUser,
);

trackRoutes.get(
  '/check-users-saved-tracks',
  validateArrayString(['ids']),
  TrackController.checkUsersSavedTracks,
);

trackRoutes.get('/get-audio-features', TrackController.getAudioFeatures);
export default trackRoutes;
