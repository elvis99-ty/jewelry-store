import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import authenticateAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/", authenticateAdmin, updateSettings);

export default router;