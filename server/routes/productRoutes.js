import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authenticateAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", authenticateAdmin, createProduct);
router.get("/admin/all-products", authenticateAdmin, getAllProducts);
router.put("/:id", authenticateAdmin, updateProduct);
router.delete("/:id", authenticateAdmin, deleteProduct);
router.get("/:id", getProductById);

export default router;