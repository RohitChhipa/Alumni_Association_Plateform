const express = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");
const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

// API to fetch user's network connections
router.get("/network", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("network", "name email profilePicture");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user.network);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// API to connect users based on postId
router.post("/connect", authenticateJWT, async (req, res) => {
  const { postId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const currentUser = await User.findById(req.user.id);
    const postOwner = await User.findById(post.author);

    if (!currentUser || !postOwner) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Add each other to their network arrays if not already connected
    if (!currentUser.network.includes(postOwner._id)) {
      currentUser.network.push(postOwner._id);
    }
    if (!postOwner.network.includes(currentUser._id)) {
      postOwner.network.push(currentUser._id);
    }

    await currentUser.save();
    await postOwner.save();

    res.status(200).json({ msg: "Connected successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;