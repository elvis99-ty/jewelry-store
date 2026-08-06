import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
import Otp from "../models/Otp.js";
import generateOTP from "../utilis/generateOTP.js";
import { sendEmail } from "../services/email.service.js";

const OTP_EXPIRY_MS = 10 * 60 * 1000; 

export const sendOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const orderExists = await Order.exists({
      "customer.email": email,
    });

    if (!orderExists) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this email.",
      });
    }

    const otpCode = generateOTP();

    const hashedOtp = await bcrypt.hash(otpCode, 10);

    const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);

    // Remove any existing OTP for this email
    await Otp.deleteOne({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp: hashedOtp,
      expiresAt: otpExpiry,
    });

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "Royal Rings - Your Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #b8860b;">Royal Rings</h2>

          <p>Hello,</p>

          <p>Your verification code is:</p>

          <h1 style="letter-spacing: 6px;">
            ${otpCode}
          </h1>

          <p>
            This code will expire in <strong>10 minutes</strong>.
          </p>

          <p>
            If you didn't request this code, you can safely ignore this email.
          </p>

          <hr>

          <small>Royal Rings Jewelry</small>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
    });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification code.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ email: normalizedEmail });

      return res.status(400).json({
        success: false,
        message: "Verification code has expired.",
      });
    }

    const isOtpValid = await bcrypt.compare(
      otp,
      otpRecord.otp
    );

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    const token = jwt.sign(
      {
        email : normalizedEmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn : "1h",
      }
    );

    await Otp.deleteOne({email : normalizedEmail});
    return res.status(200).json({
      success : true,
      message : "Verification successful.",
      token,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};