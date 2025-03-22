import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [leetCodeStats, setLeetCodeStats] = useState(null);
  const [username, setUsername] = useState(null);
  const [gitHub, setGit] = useState(null);
  const location = useLocation();
  const Data = location.state || {}; 
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/alumni/usersid", {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Data.id }), 
      });
      const data = await response.json();
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/student/id", {
        method: "POST",
      headers: {
        "auth-token": token,
      },
      body: JSON.stringify({ id:Data.id }), // Pass the ID in the body
    });
      const data = await response.json();
      setStudentData(data[0]); // Assuming the API returns an array of student profiles
      console.log("studentData", data[0].leetcode);
      setUsername(data[0].leetcode);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchLeetCodeStats = async (username) => {
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data = await response.json();
      console.log("LeetCode Stats:", data); // Debugging: Check API response
      setLeetCodeStats(data);
    } catch (error) {
      console.error("Error fetching LeetCode stats:", error);
    }
  };

  const fetchGitStats = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      console.log("Git Stats:", data); // Debugging: Check API response
      setGit(data);
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (studentData && studentData.leetcode) {
      setUsername(studentData.leetcode);
    }
  }, [studentData]);

  useEffect(() => {
    if (username) {
      fetchLeetCodeStats(username);
      fetchGitStats(username);
    }
  }, [username]);

  if (!studentData || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Student Dashboard</h1>
        <button className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={studentData.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-500"
        />
        <div className="text-center md:text-left flex-1">
          <h2 className="text-xl md:text-2xl font-semibold">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
          <p className="text-gray-700 mt-2">{studentData.bio}</p>
        </div>
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
       
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Academic Details */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-blue-600">🎓 Academic Details</h3>
          <p>Graduation Year: {studentData.year}</p>
          <p>Degree: {studentData.department}</p>
        </div>

        {/* Career Details */}
        

        {/* Skills Section */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-yellow-600">🛠 Skills</h3>
          <ul className="list-disc ml-5">
            {Array.isArray(studentData.skills) ? (
              studentData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <li>{studentData.skills}</li>
            )}
          </ul>
        </div>

        {/* GitHub Stats */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-purple-600">📊 GitHub Stats</h3>
          <p>Total Repositories: {gitHub ? gitHub.public_repos : "Loading..."}</p>
          <p>Followers: {gitHub ? gitHub.followers : "Loading..."}</p>
          <p>Following: {gitHub ? gitHub.following : "Loading..."}</p>
          <p>Bio: {gitHub ? gitHub.bio : "Loading..."}</p>
          <p>Location: {gitHub ? gitHub.location : "Loading..."}</p>
        </div>

        {/* LeetCode Stats */}
        <div className="bg-orange-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-orange-600">🔥 LeetCode Stats</h3>
          {leetCodeStats ? (
            <>
              <p><strong>Total Solved:</strong> {leetCodeStats.totalSolved}</p>
              <p><strong>Easy:</strong> {leetCodeStats.easySolved}</p>
              <p><strong>Medium:</strong> {leetCodeStats.mediumSolved}</p>
              <p><strong>Hard:</strong> {leetCodeStats.hardSolved}</p>
            </>
          ) : (
            <p>Loading LeetCode stats...</p>
          )}
        </div>

        {/* CodeChef Stats */}
        <div className="bg-red-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-red-600">🥇 CodeChef Stats</h3>
          <p>Rating:</p>
          <p>Global Rank: </p>
        </div>

        {/* LinkedIn & Socials */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-blue-600">🌐 Social Links</h3>
          <a
            href={studentData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
}