const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const authenticateJWT = require("../middleware/authenticateJWT");
const User = require("../models/User");
const Alumni = require("../models/Alumni.js");

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
  const { graduationYear, degree, jobTitle, company, industry, linkedin, skills, github, workExperience, achievements } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    // Fetch user ID from token
    const userId = req.user.id;

    // Create new alumni profile
    const alumniProfile = new Alumni({
      user: userId,
      graduationYear,
      degree,
      jobTitle,
      company,
      industry,
      linkedin,
      skills,
      github,
      profilePicture,
      workExperience: JSON.parse(workExperience),
      achievements: JSON.parse(achievements),
    });

    await alumniProfile.save();
    res.status(201).json({ msg: "Profile submitted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update alumni profile API
router.put("/update", authenticateJWT, upload.single("profilePicture"), async (req, res) => {
  try {
    const userId = req.user.id;
    const existingProfile = await Alumni.findOne({ user: userId });

    if (!existingProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Manually check and update fields if they are not empty
    if (req.body.graduationYear && req.body.graduationYear.trim() !== "") {
      existingProfile.graduationYear = req.body.graduationYear;
    }
    if (req.body.degree && req.body.degree.trim() !== "") {
      existingProfile.degree = req.body.degree;
    }
    if (req.body.jobTitle && req.body.jobTitle.trim() !== "") {
      existingProfile.jobTitle = req.body.jobTitle;
    }
    if (req.body.company && req.body.company.trim() !== "") {
      existingProfile.company = req.body.company;
    }
    if (req.body.industry && req.body.industry.trim() !== "") {
      existingProfile.industry = req.body.industry;
    }
    if (req.body.linkedin && req.body.linkedin.trim() !== "") {
      existingProfile.linkedin = req.body.linkedin;
    }
    if (req.body.skills && req.body.skills.trim() !== "") {
      existingProfile.skills = req.body.skills;
    }
    if (req.body.github && req.body.github.trim() !== "") {
      existingProfile.github = req.body.github;
    }
    if (req.body.workExperience && req.body.workExperience.trim() !== "") {
      existingProfile.workExperience = JSON.parse(req.body.workExperience);
    }
    if (req.body.achievements && req.body.achievements.trim() !== "") {
      existingProfile.achievements = JSON.parse(req.body.achievements);
    }
    if (req.file) {
      existingProfile.profilePicture = req.file.path;
    }

    await existingProfile.save();
    res.status(200).json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Fetch all alumni profiles API
router.get("/all", authenticateJWT, async (req, res) => {
  try {
    const alumniProfiles = await Alumni.find({ user: req.user.id });

    res.status(200).json(alumniProfiles[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Fetch user data API
router.get("/users", authenticateJWT, async (req, res) => {
  try {
    const users = await User.findById(req.user.id);
    res.status(200).json(users);
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


router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const alumniProfile = await Alumni.findById(req.params.id);
    if (!alumniProfile) {
      return res.status(404).json({ msg: "Alumni profile not found" });
    }
    res.status(200).json(alumniProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/id", authenticateJWT, async (req, res) => {
  try {
    const alumniProfile = await Alumni.findOne({user: req.user.id});
    if (!alumniProfile) {
      return res.status(404).json({ msg: "Alumni profile not found" });
    }
    res.status(200).json(alumniProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



module.exports = router;
