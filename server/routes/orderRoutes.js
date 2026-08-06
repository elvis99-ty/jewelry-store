import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getAllOrders,
} from "../controllers/orderController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/my-orders", authenticateUser, getMyOrders);

router.get("/admin/all-orders", getAllOrders);

router.get("/:orderId", authenticateUser, getOrderDetails);

export default router;