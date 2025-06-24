import express from 'express';
import {
  markHabitCompleted,
  getHabitTracking,
  getHabitStats,
  getAllStats,
} from "../controllers/track.controller";
import { requireAuth } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asynchandler';
const router = express.Router();

router.use(asyncHandler(requireAuth));
router.get('/stats', asyncHandler(getAllStats));
router.post('/:habitId',asyncHandler (markHabitCompleted));
router.get('/:habitId', asyncHandler(getHabitTracking));
router.get('/stats/:habitId', asyncHandler(getHabitStats));
export default router;
