import express from 'express';
import { UserController } from '../controllers/user.controller';
import validateParams from '../middlewares/validations/params.validation';
import validateOptionalParamsString from '../middlewares/validations/params.string.notRequired.validation';
import validateOptionalParamsNumber from '../middlewares/validations/params.integer.notRequired.validation';

const userRoutes = express.Router();

// Routes
/**
 * @openapi
 * /users/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user profile
 *     description: Retrieve the profile information for the authenticated user.
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time the user was created.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the error.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the server error.
 */
userRoutes.get('/profile', UserController.getProfile);
/**
 * @openapi
 * /users/me/top:
 *   get:
 *     tags:
 *       - User
 *     summary: Get top items by type
 *     description: Retrieve top items by type for the authenticated user.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of items to retrieve.
 *       - in: query
 *         name: time_range
 *         schema:
 *           type: string
 *         required: false
 *         description: The time range for the items.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           format: int32
 *         required: false
 *         description: The number of items to retrieve.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           format: int32
 *         required: false
 *         description: The offset for the items to retrieve.
 *     responses:
 *       200:
 *         description: A list of top items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
userRoutes.get(
  '/me/top',
  validateParams(['type']),
  validateOptionalParamsString(['time_range']),
  validateOptionalParamsNumber(['limit', 'offset']),
  UserController.getTopByType,
);

export default userRoutes;
