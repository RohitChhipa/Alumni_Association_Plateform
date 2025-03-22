const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./Routes/Auth");
const studentRouter = require("./Routes/StudentProfile");
const alumniRouter = require("./Routes/AlumniProfile");
const Post = require("./Routes/Post");
const jobRoutes = require("./Routes/jobRoutes");
const fetch = require("node-fetch");
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Get MongoDB URI from .env
const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
  console.error("MongoDB URI is missing! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Hello World API
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/leetcode-stats", async (req, res) => {
  const { username } = req.body;

  const query = `
      query userSessionProgress($username: String!) {
          allQuestionsCount {
              difficulty
              count
          }
          matchedUser(username: $username) {
              submitStats {
                  acSubmissionNum {
                      difficulty
                      count
                  }
              }
          }
      }`;

  try {
      const response = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // Helps bypass bot restrictions
          },
          body: JSON.stringify({ query, variables: { username } }),
      });

      if (!response.ok) {
          throw new Error(`LeetCode API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
  } catch (error) {
      console.error("Error fetching LeetCode stats:", error.message);
      res.status(500).json({ error: "Failed to fetch LeetCode stats" });
  }
});
// Router middleware
app.use("/auth", authRouter);
app.use("/student", studentRouter);
app.use("/alumni", alumniRouter);
app.use("/post", Post);
app.use("/network", require("./Routes/Network"));
app.use("/api/jobs", jobRoutes);
app.use("/api/messages", require("./Routes/Chat"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
