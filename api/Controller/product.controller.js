const Product = require("../product/Product.model");
//Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Get selected product at once
const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ referenceId: productId });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Post or create a product at once
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Put or update a product at once
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(
      { referenceId: productId },
      req.body
    );
    if (!product) {
      res.status(404).json({ message: "Data not found" });
    }
    const updateProduct = await Product.findById(product._id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a product at once
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productdata = await Product.findOne({ referenceId: productId });
    if (!productdata) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = await Product.findByIdAndDelete(productdata._id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
