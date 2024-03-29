const Blog = require("../blog/blog.model");
//Get data
const getAllBlogs = async (req, res) => {
  let blogs;
  try {
    try {
      blogs = await Blog.find();
    } catch (err) {
      return console.error(err);
    }
    if (!blogs) {
      return res.status(404).json({ message: "No Blob files present" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//Post data
const addBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    return res
      .status(201)
      .json({ message: "Blog post created successfully", blog: newBlog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBlogs, addBlog };
