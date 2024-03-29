const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./keys").mongoURI;
const productRoute = require("./routes/product.route");
const blogRoute = require("./routes/blogs.route");
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
// Routes
app.use("/api", productRoute);
app.use("/api", blogRoute);
//Mongoose
mongoose
  .connect(db)
  .then(() => {
    app.listen(port, () => {
      console.log("DB connected");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
