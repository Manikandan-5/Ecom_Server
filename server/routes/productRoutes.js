const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// DEBUG (important)
console.log("createProduct:", createProduct);
console.log("getProducts:", getProducts);

router.get("/", getProducts);
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;