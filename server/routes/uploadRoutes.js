import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";
import authenticateAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authenticateAdmin, upload.single("image"), uploadImage);

export default router;