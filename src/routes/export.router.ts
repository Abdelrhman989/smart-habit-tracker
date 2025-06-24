import express from 'express';
import { exportHabitCSV, exportHabitPDF } from '../controllers/export.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asynchandler';
const router = express.Router();
router.use(asyncHandler(requireAuth));

router.get('/csv', asyncHandler(exportHabitCSV));
router.get('/pdf', asyncHandler(exportHabitPDF));

export default router;
