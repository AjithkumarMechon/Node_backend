const mongoose = require("mongoose");
const blogScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const blog = mongoose.model("blob", blogScheme);
module.exports = blog;
