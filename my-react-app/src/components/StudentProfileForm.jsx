import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentProfileForm() {
  const [enrollment, setEnrollment] = useState("");
  const [year, setYear] = useState("1st");
  const [department, setDepartment] = useState("");
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [codechef, setCodechef] = useState("");
  const [github, setGithub] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
const Navigate = useNavigate();
const check=async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to access this page.");
    Navigate('/login'); // Redirect to login page if not authenticated
  } else {
    try {
      const response = await fetch("http://localhost:5000/student/all", {
        headers: {
          "auth-token": token,
        },
      });
      const data = await response.json();
      console.log(data);
      console.log(response.headers.get("Content-Length"));
      if (response.headers.get("Content-Length") === "2") {
        console.log("No data found for this user.");
        Navigate(`/create-profile/student`); // Redirect to create profile page if no data found}`);
    } else {
   
        Navigate(`/postall`);
    }
     // Check the response data
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }
}
check();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("enrollment", enrollment);
    formData.append("year", year);
    formData.append("department", department);
    formData.append("contact", contact);
    formData.append("skills", skills);
    formData.append("linkedin", linkedin);
    formData.append("leetcode", leetcode);
    formData.append("codechef", codechef);
    formData.append("github", github);
    formData.append("profilePicture", profilePicture);

    try {
    const response = await fetch("http://localhost:5000/student/submit", {
        method: "POST",
        body: formData, // Send FormData directly
        headers: {
          // "Content-Type" should NOT be set manually
          "auth-token": localStorage.getItem("token"), // If authentication is needed
        },
      });
      alert("Profile submitted successfully!");
      Navigate('/create-dashboard/student'); // Redirect to dashboard after submission
      
      console.log("Profile Submitted: ", response.data);
    } catch (error) {
      console.error("Error submitting profile: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-white p-4">
      <div className="w-full max-w-3xl bg-gray-100 shadow-lg rounded-2xl border border-gray-300 p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Student Profile Creation
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Enrollment Number</label>
            <input
              type="text"
              placeholder="Enter your enrollment number"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Current Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Department/Branch</label>
            <input
              type="text"
              placeholder="Enter your department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Contact Information</label>
            <input
              type="text"
              placeholder="Enter your contact info"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Skills</label>
            <input
              type="text"
              placeholder="Enter your skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">LinkedIn Profile</label>
            <input
              type="text"
              placeholder="Enter your LinkedIn URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">LeetCode Username</label>
            <input
              type="text"
              placeholder="Enter your LeetCode username"
              value={leetcode}
              onChange={(e) => setLeetcode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">CodeChef Username</label>
            <input
              type="text"
              placeholder="Enter your CodeChef username"
              value={codechef}
              onChange={(e) => setCodechef(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">GitHub Username</label>
            <input
              type="text"
              placeholder="Enter your GitHub username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <label className="block text-gray-700 mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 w-full mt-2 bg-black text-white py-2 rounded-lg transition hover:bg-blue-600"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </div>
  );
}