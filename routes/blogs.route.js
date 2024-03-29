const express = require("express");
const router = express.Router();
const { getAllBlogs, addBlog } = require("../Controller/blog.controller");

router.get("/blog/", getAllBlogs);
router.post("/add/", addBlog);
module.exports = router;
