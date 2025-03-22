import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, idx }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const postid = idx;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      setLiked(post.likedBy.includes(userId));
    }
  }, [post.likedBy]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/post/like/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setLikes(data.likes);
        setLiked(!liked);
      } else {
        const errorData = await response.json();
        alert(`Error updating like status: ${errorData.msg}`);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      alert("Error updating like status. Please try again.");
    }
  };

  const handleNavigate = () => {
    navigate(`/alumni-dashboard/${post.author._id}`);
  };

  const handleConnect = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/network/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ postId: post._id }),
      });

      if (response.status === 200) {
        alert("Connected successfully!");
      } else {
        const errorData = await response.json();
        alert(`Connection failed: ${errorData.msg}`);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Connection failed. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-xl  mb-24">
      {/* Image */}
      {post.image && <img src={post.image} alt="Post" className="w-full h-80 object-cover" />}

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        {post.category && (
          <span className="bg-blue-200 text-blue-600 px-3 py-1 text-xs rounded-full font-semibold">
            {post.category}
          </span>
        )}

        {/* Title & Description */}
        {post.title && <h2 className="mt-2 text-lg font-semibold text-gray-900">{post.title}</h2>}
        {post.description && <p className="text-gray-600 text-sm mt-1">{post.description}</p>}

        {/* Author & Like Button */}
        <div className="mt-4 flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center space-x-2">
            {post.authorAvatar && (
              <img src={post.authorAvatar} alt="Author" className="w-8 h-8 rounded-full" />
            )}
            <div>
              {post.author && <p className="text-sm font-medium text-gray-900">{post.author.name}</p>}
              {post.time && <p className="text-xs text-gray-500">{post.time}</p>}
            </div>
          </div>

          {/* Like Button */}
          <button 
            onClick={handleLike} 
            className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
          >
            <img 
              src="https://res.cloudinary.com/dkyyjytbr/image/upload/v1742452795/lxyy8rt218cldxion7ca.png"  
              alt="Like" 
              className="w-6 h-6 sm:w-8 sm:h-8"  // Adjust icon size for responsiveness
            />
            <span className="text-sm sm:text-base font-medium">{likes}</span> 
          </button>

          {/* Connect Button */}
          <button onClick={handleConnect} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Connect
          </button>

          {/* Navigate to Author's Dashboard */}
          
        </div>
      </div>
    </div>
  );
}