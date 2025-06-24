import express from 'express';
import { saveSubscription } from '../controllers/notification.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asynchandler';
const router = express.Router();
router.use(asyncHandler(requireAuth));

router.post('/subscribe', asyncHandler(saveSubscription));

export default router;
