const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["student", "alumni"],
    default: "student",
  },
  password: {
    type: String,
    required: true,
  },
  signUpDate: {
    type: Date,
    default: Date.now,
  },
  network: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chatList : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Store user IDs of people they have chatted with
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
