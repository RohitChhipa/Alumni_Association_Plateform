import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Network = () => {
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pic, setPic] = useState("/");
    const [role, setRole]=useState("student");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const token = localStorage.getItem("token"); // Fetch token for auth
                const userResponse = await fetch("http://localhost:5000/auth/user1", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                });
                const userData = await userResponse.json();
                setRole(userData.role);
                // Fetch both APIs together
                const [response, response1] = await Promise.all([
                    fetch("http://localhost:5000/network/network", {
                        headers: { "auth-token": token },
                    }),
                    fetch(`http://localhost:5000/student/all`, {
                        headers: { "auth-token": token },
                    }),
                ]);

                if (!response.ok) throw new Error("Failed to fetch connections");
                // if (!response1.ok) throw new Error("Failed to fetch alumni data");

                const data = await response.json();
                const data1 = await response1.json();
             
                console.log(data1, "data1");
                // Set the profile picture from the first alumni (adjust as needed)
                
                    setPic(data1.
                        profilePicture || "/default.png");
                

                setConnections(data);
            } catch (error) {
                console.error("Error fetching network:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, []);

    const show =async (user) => {
        const userResponse = await fetch("http://localhost:5000/auth/user2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user._id }) // ✅ Proper JSON format
        });
        const userData = await userResponse.json();
       
        navigate(`/${userData.role}-dashboard`, { state: { id: user._id } });

    };

    return (
        <div className="max-w-2xl mx-auto mt-6 p-4">
            <div className="mb-4">
                <label className="block font-medium text-lg">Filter By Department</label>
                <select className="w-full p-2 border rounded-md">
                    <option value="">All Departments</option>
                    {/* Dynamically populate departments */}
                    {[...new Set(connections.map((c) => c.department))].map((dept) => (
                        <option key={dept} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="space-y-4">
                    {connections.map((user) => (
                        <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={pic || "https://via.placeholder.com/50"}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-lg">{user.name}</p>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                    <p className="text-gray-600 text-sm">Department: {user.department || "N/A"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => show(user)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Show Profile
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Network;
