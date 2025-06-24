import express from "express";
import {
  register,
  resendOtp,
  forgotPassword,
  resetPassword,
  verifyOtp,
  login,
} from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asynchandler";
const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/verify-otp", asyncHandler(verifyOtp));
router.post("/login", asyncHandler(login));
router.post("/resend-otp", asyncHandler(resendOtp));
router.post("/forgot-password", asyncHandler(forgotPassword));
router.post("/reset-password", asyncHandler(resetPassword));

export default router;
