const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

// Create a New Job Post
router.post("/create", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job post created successfully!", job: newJob });
  } catch (error) {
    res.status(500).json({ error: "Error creating job post", details: error.message });
  }
});

// Get All Job Posts
router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching job posts", details: error.message });
  }
});

// Get a Single Job Post by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: "Error fetching job post", details: error.message });
  }
});

// Delete a Job Post
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting job post", details: error.message });
  }
});

module.exports = router;
