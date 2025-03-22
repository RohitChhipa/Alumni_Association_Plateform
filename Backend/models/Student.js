const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  enrollment: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  leetcode: {
    type: String,
  },
  codechef: {
    type: String,
  },
  github: {
    type: String,
  },
  Bio:{
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
