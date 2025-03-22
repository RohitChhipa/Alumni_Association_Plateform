import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function AlumniDashboard1() {
  const [alumniData, setAlumniData] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const Data = location.state || {}; 
  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/alumni/id", {
            method: "POST",
          headers: {
            "auth-token": token,
          },
          body: JSON.stringify({ id:Data.id }), // Pass the ID in the body
        });
        const data = await response.json();
        setAlumniData(data);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      }
    };
    const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
      
          if ( !Data.id) {
            console.error("Error: Missing user ID");
            return;
          }
      
          const response = await fetch("http://localhost:5000/alumni/usersid", {
            method: "POST",
            headers: {
              "auth-token": token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: Data.id }), 
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
      
          const data = await response.json();
          console.log(data, "data");
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      

    fetchAlumniData();
    fetchUserData();
  }, []);
//   console.log(userData);
  if (!alumniData || !userData) {
    return <div>Loading.ff..</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">{userData.name}' Dashboard</h1>
        <button className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={alumniData.profilePicture}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-500"
        />
        <div className="text-center md:text-left flex-1">
          <h2 className="text-xl md:text-2xl font-semibold">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
          <p className="text-gray-700 mt-2">{alumniData.skills}</p>
        </div>
      
       
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Academic Details */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-blue-600">🎓 Academic Details</h3>
          <p>Graduation Year: {alumniData.graduationYear}</p>
          <p>Degree: {alumniData.degree}</p>
        </div>

        {/* Career Details */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-green-600">💼 Career Details</h3>
          <p>Current Job: {alumniData.jobTitle}</p>
          <p>Company: {alumniData.company}</p>
          <p>Industry: {alumniData.industry}</p>
        </div>

        {/* Experience Section */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-yellow-600">📌 Work Experience</h3>
          <ul className="list-disc ml-5">
            {alumniData.workExperience && alumniData.workExperience.map((exp, index) => (
              <li key={index}>{exp.title} at {exp.company} ({exp.duration})</li>
            ))}
          </ul>
        </div>

        {/* Mentorship Availability */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-purple-600">🤝 Mentorship</h3>
          <p>{alumniData.mentoringAvailability ? "Available for mentoring" : "Not available for mentoring"}</p>
        </div>

        {/* Articles Published */}
        <div className="bg-orange-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-orange-600">📝 Articles Published</h3>
          <p>Number of Articles: {alumniData.articlesPublished}</p>
        </div>

        {/* Achievements */}
        <div className="bg-red-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-red-600">🏆 Achievements</h3>
          <ul className="list-disc ml-5">
            {alumniData.achievements && alumniData.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        {/* LinkedIn & Socials with Icons */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-4">
          <h3 className="text-lg font-semibold text-blue-600">🌐 Social Links</h3>
          
          {alumniData.linkedin && (
            <a href={alumniData.linkedin} target="_blank" rel="noopener noreferrer">
              <svg
                className="w-8 h-8 text-blue-600 hover:text-blue-800 transition"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.4c-.967 0-1.5-.7-1.5-1.6s.553-1.6 1.5-1.6c.947 0 1.5.7 1.5 1.6s-.553 1.6-1.5 1.6zm12.5 11.4h-3v-5.4c0-1.3-.5-2.1-1.6-2.1s-1.9.8-1.9 2v5.5h-3v-10h3v1.4c.8-1.2 2-1.6 3.3-1.6 2.3 0 3.7 1.5 3.7 4.5v5.7z"/>
              </svg>
            </a>
            
          )}
          
          {alumniData.github && (
            <a href={alumniData.github} target="_blank" rel="noopener noreferrer">
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-8 h-8" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}