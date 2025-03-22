import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AlumniProfileForm() {
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
      const response = await fetch("http://localhost:5000/alumni/submit", {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: formData,
      });

      if (response.status === 201) {
        alert("Profile submitted successfully!");
        navigate('/postall');
      } else {
        const errorData = await response.json();
        alert(`Profile submission failed: ${errorData.msg}`);
      }
    } catch (error) {
      console.error("Profile submission error:", error);
      alert("Profile submission failed. Please try again.");
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
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl border border-gray-300 p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Alumni Profile Creation
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Graduation Year</label>
            <input
              type="number"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Degree Earned</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Current Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Company/Organization</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">LinkedIn Profile</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">GitHub Username</label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">Skills/Expertise</label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">Work Experience</label>
            {workExperience.map((experience, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.title}
                  onChange={(e) => handleWorkExperienceChange(index, "title", e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={experience.company}
                  onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={experience.duration}
                  onChange={(e) => handleWorkExperienceChange(index, "duration", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">Achievements</label>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Achievement"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="col-span-2 flex justify-center">
            <label className="block text-gray-600 mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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