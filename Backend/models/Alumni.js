const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  skills: {
    type: String,
  },
  github: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  workExperience: [
    {
      title: String,
      company: String,
      duration: String,
    },
  ],
  achievements: [String],
});

const Alumni = mongoose.model("Alumni", alumniSchema);

module.exports = Alumni;