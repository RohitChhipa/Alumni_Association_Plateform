const express = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");
const Post = require("../models/Post");
const Alumni = require("../models/Alumni");
const Student=require("../models/Student");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dkyyjytbr",
  api_key: "113618945226988",
  api_secret: "mxXRzQXdoJOwXZWlzPE2_6Edzsw",
});

// Configure Multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage: storage });

// API to submit a new post
router.post("/submitPost", authenticateJWT, upload.single("image"), async (req, res) => {
  const { category, title, description, tags } = req.body;
  const image = req.file ? req.file.path : null; // Ensure correct path handling

  try {
    // Fetch user ID from token
    const userId = req.user.id;

    // Fetch author details from either Alumni or Student schema
    let authorProfile = await Alumni.findOne({ user: userId });
    if (!authorProfile) {
      authorProfile = await Student.findOne({ user: userId });
    }

    // If no profile found, return an error
    if (!authorProfile) {
      return res.status(404).json({ msg: "Author profile not found" });
    }

    // Create a new post
    const newPost = new Post({
      image,
      category,
      title,
      description,
      tags,
      author: userId,
      authorAvatar: authorProfile.profilePicture || "/default-avatar.png", // Ensure default if null
      time: new Date().toISOString(),
    });

    // Save the post to the database
    await newPost.save();

    res.status(201).json({ msg: "Post submitted successfully", post: newPost });
  } catch (err) {
    console.error("Error submitting post:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// API to fetch all posts
router.get("/allPosts", authenticateJWT, async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name profilePicture");
    res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
// API to like/unlike a post
router.put("/like/:id", authenticateJWT, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the user has already liked the post
    const index = post.likedBy.indexOf(userId);
    if (index === -1) {
      // User has not liked the post, so like it
      post.likes += 1;
      post.likedBy.push(userId);
    } else {
      // User has already liked the post, so unlike it
      post.likes -= 1;
      post.likedBy.splice(index, 1);
    }

    await post.save();

    res.status(200).json({ msg: "Post like status updated successfully", likes: post.likes });
  } catch (err) {
    console.error("Error updating like status:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;