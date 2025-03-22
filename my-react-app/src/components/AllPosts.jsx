import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/auth/user1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();
      setRole(data.role); // Assuming the user data contains a role field
      console.log("role", data.role);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("role: " + role);
      const response = await fetch(`http://localhost:5000/${role}/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();
      console.log("data", data);
      if (role === "student") setUserAvatar(data[0].profilePicture);
      else setUserAvatar(data.profilePicture);
      console.log(data[0].profilePicture, "pic"); // Assuming the user data contains an avatar field
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/post/allPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchUserRole();
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (role) {
      fetchUserData();
    }
  }, [role]);

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Back2Campus</h1>

        <div className="flex items-center space-x-4">
          <div className="relative inline-block text-left">
            {/* Create Button */}
            <button
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              + Create
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    navigate("/postcreate");
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  📄 Simple Post
                </button>
                <button
                  onClick={() => {
                    navigate("/job");
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  💼 Job Post
                </button>
              </div>
            )}
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/network")}
          >
            🛜 Network
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/chat")}
          >
            🛜 Chat
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/jobs")}
          >
            💼 Job Posts
          </button>
          <div
            onClick={() => navigate(`/create-dashboard/${role}`)}
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
          >
            {userAvatar ? (
              <img src={userAvatar} alt="User Avatar" className="w-full h-full rounded-full" />
            ) : (
              <i className="fas fa-user text-black"></i>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-2xl mx-auto py-10 ">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} idx={post._id} />
        ))}
        {loading && <p className="text-center text-gray-500">Loading more posts...</p>}
      </div>
    </div>
  );
}