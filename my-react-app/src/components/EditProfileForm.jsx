import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: null,
    name: "",
    bio: "",
    degree: "",
    graduationYear: "",
    skills: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Create FormData object
    const data = new FormData();
    data.append("profilePicture", formData.profilePicture);
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    data.append("degree", formData.degree);
    data.append("graduationYear", formData.graduationYear);
    data.append("skills", formData.skills);
    data.append("linkedin", formData.linkedin);

    try {
      const response = await fetch("http://localhost:5000/student/edit", {
        method: "PUT",
        headers: {
          "auth-token": token, // DO NOT set "Content-Type" for FormData
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Profile updated successfully:", result);
      alert("Profile updated successfully!");
      navigate('/create-dashboard/student');
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4">
          {/* Profile Image */}
          <div>
            <label className="block text-gray-600">Profile Image</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Profile Name */}
          <div>
            <label className="block text-gray-600">Profile Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Profile Description */}
          <div>
            <label className="block text-gray-600">Profile Description</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            ></textarea>
          </div>

          {/* Academic Info */}
          <div>
            <label className="block text-gray-600">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          {/* Skills */}
          <div>
            <label className="block text-gray-600">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-gray-600">LinkedIn (Optional)</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}