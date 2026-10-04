import rateLimit from "express-rate-limit";

export const otpSendLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1,
  message: {
    success: false,
    message: "Please wait before requesting another code.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.body.email?.toLowerCase() || req.ip,
});

export const otpVerifyLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5,
  message: {
    success: false,
    message: "Too many attempts. Please request a new code.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.body.email?.toLowerCase() || req.ip,
});