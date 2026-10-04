import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import authenticateAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/my-orders", authenticateUser, getMyOrders);

router.get("/admin/all-orders", authenticateAdmin, getAllOrders);

router.patch("/admin/:orderId/status", authenticateAdmin, updateOrderStatus);

router.get("/:orderId", authenticateUser, getOrderDetails);

export default router;