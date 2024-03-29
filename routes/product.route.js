const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../Controller/product.controller.js");
const { signupUser, login } = require("../Controller/user.controller.js");
//products
router.get("/products/", getProducts);
router.get("/products/:id", getProduct);
router.post("/products/", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
//users
router.post("/users/signup/", signupUser);
router.post("/users/login/", login);
//blob

module.exports = router;
