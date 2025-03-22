import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditAlumniProfile() {
  const navigate = useNavigate();
  const [graduationYear, setGraduationYear] = useState("");
  const [degree, setDegree] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [skills, setSkills] = useState("");
  const [github, setGithub] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [workExperience, setWorkExperience] = useState([{ title: "", company: "", duration: "" }]);
  const [achievements, setAchievements] = useState([""]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/alumni/all", {
          headers: {
            "auth-token": token,
          },
        });
        const data = await response.json();
        setGraduationYear(data.graduationYear);
        setDegree(data.degree);
        setJobTitle(data.jobTitle);
        setCompany(data.company);
        setIndustry(data.industry);
        setLinkedin(data.linkedin);
        setSkills(data.skills);
        setGithub(data.github);
        setProfilePicture(data.profilePicture);
        setWorkExperience(data.workExperience || [{ title: "", company: "", duration: "" }]);
        setAchievements(data.achievements || [""]);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("graduationYear", graduationYear);
    formData.append("degree", degree);
    formData.append("jobTitle", jobTitle);
    formData.append("company", company);
    formData.append("industry", industry);
    formData.append("linkedin", linkedin);
    formData.append("skills", skills);
    formData.append("github", github);
    formData.append("workExperience", JSON.stringify(workExperience));
    formData.append("achievements", JSON.stringify(achievements));
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/alumni/update", {
        method: "PUT",
        headers: { "auth-token": token },
        body: formData,
      });

      if (response.status === 200) {
        alert("Profile updated successfully!");
        navigate("/create-dashboard/alumni");
      } else {
        const errorData = await response.json();
        alert(`Update failed: ${errorData.msg}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed. Please try again.");
    }
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = value;
    setWorkExperience(newWorkExperience);
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, { title: "", company: "", duration: "" }]);
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };

  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Edit Alumni Profile</h1>
        <button
          onClick={() => navigate("/create-dashboard/alumni")}
          className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
        >
          Cancel
        </button>
      </div>

      {/* Profile Form */}
      <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600">Graduation Year</label>
            <input
              type="number"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Degree Earned</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Current Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Skills</label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Social Links */}
          <div className="col-span-2 flex items-center gap-4">
            <label className="text-gray-600">Social Links:</label>
            <input
              type="url"
              placeholder="LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="GitHub Username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Work Experience */}
          <div className="col-span-2">
            <label className="block text-gray-600">Work Experience</label>
            {workExperience.map((exp, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => handleWorkExperienceChange(index, "title", e.target.value)}
                  className="w-1/3 px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)}
                  className="w-1/3 px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleWorkExperienceChange(index, "duration", e.target.value)}
                  className="w-1/3 px-4 py-2 border rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addWorkExperience}
              className="w-full bg-blue-600 text-white py-2 rounded-lg transition hover:bg-blue-700"
            >
              Add Work Experience
            </button>
          </div>

          {/* Achievements */}
          <div className="col-span-2">
            <label className="block text-gray-600">Achievements</label>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Achievement"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAchievement}
              className="w-full bg-blue-600 text-white py-2 rounded-lg transition hover:bg-blue-700"
            >
              Add Achievement
            </button>
          </div>

          <button type="submit" className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}