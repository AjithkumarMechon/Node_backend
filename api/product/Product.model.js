const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    referenceId: {
      type: Number,
      unique: true,
    },
    details: [
      {
        _id: false,
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        image: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.referenceId) {
      const lastProduct = await this.constructor.findOne(
        {},
        {},
        { sort: { referenceId: -1 } }
      );
      this.referenceId = lastProduct
        ? parseInt(lastProduct.referenceId) + 1
        : 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
