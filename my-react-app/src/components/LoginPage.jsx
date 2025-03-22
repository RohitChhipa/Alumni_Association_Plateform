import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Get raw response
            throw new Error(`Login failed: ${errorText}`);
        }

        const data = await response.json(); // Only parse JSON if response is valid
        alert("Login successful!");
        localStorage.setItem("token", data.token);

        // Fetch user details
        const userResponse = await fetch("http://localhost:5000/auth/user1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": data.token,
            },
            body: JSON.stringify({ email }), // Ensure email is sent
        });

        if (!userResponse.ok) {
            throw new Error("Failed to fetch user details.");
        }

        const userData = await userResponse.json();
        const role = userData.role;
        console.log(role); // Check the role of the user

        // Fetch alumni data
        const alumniResponse = await fetch("http://localhost:5000/alumni/all", {
            headers: { "auth-token": data.token },
        });

        if (!alumniResponse.ok) {
            throw new Error("Failed to fetch alumni data.");
        }
        // Check the alumni response
        if (alumniResponse.headers.get("Content-Length") === "0") {
          navigate(`/create-profile/${role}`);
      } else {
          const alumniData = await alumniResponse.json();
          console.log("Alumni Data:", alumniData);
          navigate('/postall');
      }
    
    } catch (error) {
        console.error("Login error:", error.message);
        alert(error.message);
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-linear-to-r from-cyan-100 via-blue-300 to-indigo-400">
    <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-1/2 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between text-sm text-blue-600 mb-4">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
          alt="Login Side"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
  );
}