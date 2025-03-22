import React, { useState } from "react";

function JobPost() {
  const [postType, setPostType] = useState("job");
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    description: "",
    requirements: "",
    benefits: "",
    deadline: "",
    contactEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Job post created successfully!");
        alert("Job post created successfully!");
        setFormData({
          title: "",
          company: "",
          location: "",
          salary: "",
          experience: "",
          description: "",
          requirements: "",
          benefits: "",
          deadline: "",
          contactEmail: "",
        });
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ Error submitting job post. Please try again.");
      console.error("Submission error:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Create New Position
        </h1>

        {/* Post Type Selection */}
        <div className="flex justify-center gap-4 mb-8">
          {["job", "internship", "other"].map((type) => (
            <button
              key={type}
              onClick={() => setPostType(type)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                postType === type
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {type === "job" ? "💼 Job Posting" : type === "internship" ? "🎓 Internship" : "➕ Other"}
            </button>
          ))}
        </div>

        {/* Submission Message */}
        {message && (
          <div className="text-center text-lg font-semibold mb-4 text-blue-600">{message}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">🏢 Position Details</h2>
            </div>

            {[
              { name: "title", label: "Position Title *", placeholder: "e.g., Senior Software Engineer" },
              { name: "company", label: "Company Name *", placeholder: "e.g., Tech Solutions Inc." },
              { name: "location", label: "Location *", placeholder: "e.g., New York, NY (Remote/Hybrid/Onsite)" },
              { name: "salary", label: "Salary Range", placeholder: "e.g., $80,000 - $120,000/year" },
              { name: "experience", label: "Experience Required", placeholder: "e.g., 3-5 years" },
              { name: "deadline", label: "Application Deadline *", type: "date" },
              { name: "contactEmail", label: "Contact Email *", type: "email", placeholder: "e.g., careers@company.com" },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            {[
              { name: "description", label: "Position Description *", placeholder: "Describe the position and responsibilities..." },
              { name: "requirements", label: "Requirements *", placeholder: "List the required skills, qualifications, and experience..." },
              { name: "benefits", label: "Benefits", placeholder: "List the benefits and perks..." },
            ].map((field, index) => (
              <div key={index} className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                <textarea
                  name={field.name}
                  required
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <div className="col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 text-white font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-purple-700 hover:to-blue-700"
                } focus:ring-4 focus:ring-purple-300 transition-all`}
              >
                {isSubmitting ? "Posting..." : "Post Position"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobPost;
