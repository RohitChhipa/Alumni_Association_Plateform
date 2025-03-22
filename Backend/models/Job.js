const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  experience: { type: String },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  benefits: { type: String },
  deadline: { type: Date, required: true },
  contactEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
