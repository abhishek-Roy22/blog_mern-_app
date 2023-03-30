const Blog = require("../models/blogModels");
const mongoose = require("mongoose");

// Get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });

  res.status(200).json(blogs);
};

// Get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Blog" });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(400).json({ error: "No such Blog" });
  }

  res.status(200).json(blog);
};

// Create a blog
const createBlog = async (req, res) => {
  const { title, desc } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!desc) {
    emptyFields.push("desc");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const blog = await Blog.create({ title, desc });

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such blog" });
  }

  const blog = await Blog.findByIdAndDelete({ _id: id });

  if (!blog) {
    return res.status(400).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

// Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such blog" });
  }

  const blog = await Blog.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!blog) {
    return res.status(400).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
