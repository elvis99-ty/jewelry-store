import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otpController.js";
import { otpSendLimiter, otpVerifyLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/send", otpSendLimiter, sendOtp);
router.post("/verify", otpVerifyLimiter, verifyOtp);

export default router;