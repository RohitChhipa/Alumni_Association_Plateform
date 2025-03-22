const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const authenticateJWT = require("../middleware/authenticateJWT");
const User = require("../models/User");
const Student = require("../models/Student");

const router = express.Router();

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

// Form submission API
router.post("/submit", authenticateJWT, upload.single("profilePicture"), async (req, res) => {
  const { enrollment, year, department, contact, skills, linkedin, leetcode, codechef, github } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    // Fetch user ID from token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create new student profile
    const studentProfile = new Student({
      user: user._id,
      enrollment,
      year,
      department,
      contact,
      skills,
      linkedin,
      leetcode,
      codechef,
      github,
      profilePicture,
    });

    await studentProfile.save();
    res.status(201).json({ msg: "Profile submitted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/all", authenticateJWT, async (req, res) => {
  try {
    const studentProfile = await Student.find({ user: req.user.id });

    res.status(200).json(studentProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Edit profile API
router.put("/edit", authenticateJWT, upload.single("profilePicture"), async (req, res) => {
  const { bio, degree, graduationYear, skills, linkedin } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    // Fetch user ID from token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update student profile
    const updatedProfile = {
      bio,
      degree,
      graduationYear,
      skills,
      linkedin,
    };

    if (profilePicture) {
      updatedProfile.profilePicture = profilePicture;
    }

    const studentProfile = await Student.findOneAndUpdate(
      { user: user._id },
      { $set: updatedProfile },
      { new: true }
    );

    res.status(200).json(studentProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/id", authenticateJWT, async (req, res) => {
  try {
    const alumniProfile = await Student.findOne({user: req.user.id});
    if (!alumniProfile) {
      return res.status(404).json({ msg: "Stuedent  profile not found" });
    }
    res.status(200).json(alumniProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/usersid", authenticateJWT, async (req, res) => {
  try {
    const users = await User.findById(req.body.id);
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;