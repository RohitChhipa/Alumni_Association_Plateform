import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", description: "", category: "", tags: "", image: null });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({ ...post, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("category", post.category);
    formData.append("tags", post.tags);
    formData.append("image", post.image);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/post/submitPost", {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: formData,
      });

      if (response.status === 201) {
        alert("Post submitted successfully!");
        navigate("/postall");
      } else {
        const errorData = await response.json();
        alert(`Post submission failed: ${errorData.msg}`);
      }
    } catch (error) {
      console.error("Post submission error:", error);
      alert("Post submission failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Create a New Post</h2>
          <button className="px-4 py-2 bg-black text-white rounded-lg text-lg font-medium hover:bg-gray-900">+ Create</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Post Title" value={post.title} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
          
          <textarea name="description" placeholder="Post Description" value={post.description} onChange={handleChange} rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"></textarea>
          <textarea name="category" placeholder="Category" value={post.category} onChange={handleChange} rows="1" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"></textarea>

          
          <input type="text" name="tags" placeholder="Tags (comma-separated)" value={post.tags} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
          
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg">Upload Image
              <input type="file" onChange={handleImageChange} className="hidden" />
            </label>
            {preview && <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />}
          </div>
          
          <button type="submit" className="w-full p-3 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-900 hover:bg-white hover:text-black hover:border-b-gray-950 ">Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;