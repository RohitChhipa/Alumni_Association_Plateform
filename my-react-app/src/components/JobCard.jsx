import React, { useState } from "react";

function JobCard({ job, onApply }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-2xl m-auto mt-11 bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-6 border border-gray-300 transition-all transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full shadow-sm">
        <img 
          src="https://static.vecteezy.com/system/resources/previews/015/280/523/original/job-logo-icon-with-tie-image-free-vector.jpg" 
          alt={job.company} 
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
      <p className="text-lg font-medium text-gray-700 mt-1">{job.company}</p>
      <p className="text-gray-600 mt-1">📍 {job.location}</p>
      <p className="text-sm text-gray-500 mt-2">📅 Deadline: {job.deadline}</p>
      <p className="mt-3 text-gray-800 text-sm ">{job.description}</p>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">💰 {job.salary || "Negotiable"}</span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">🏆 {job.experience || "Any Experience"}</span>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
      >
        🚀 Apply Now
      </button>
      
      {/* Email Application Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-100 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center w-96 border border-gray-200 transform scale-90 animate-scaleUp">
            <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
            <p className="text-gray-600 mt-4 text-lg">📧 Send your resume to:</p>
            <p className="text-xl font-semibold text-blue-600 mt-3 bg-blue-100 px-4 py-2 rounded-lg inline-block">{job.contactEmail}</p>
            <button 
              onClick={() => setOpen(false)} 
              className="mt-6 w-full py-3 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-600 transition-all shadow-md"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }
          @keyframes scaleUp {
            from { transform: scale(0.8); }
            to { transform: scale(1); }
          }
          .animate-scaleUp {
            animation: scaleUp 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

export default JobCard;
