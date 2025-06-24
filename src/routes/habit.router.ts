import express from 'express';
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit
} from '../controllers/habit.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asynchandler';

const router = express.Router();

router.use(asyncHandler(requireAuth));

router.post('/', asyncHandler(createHabit));
router.get('/', asyncHandler(getHabits));
router.put('/:id', asyncHandler(updateHabit));
router.delete('/:id', asyncHandler(deleteHabit));

export default router;
