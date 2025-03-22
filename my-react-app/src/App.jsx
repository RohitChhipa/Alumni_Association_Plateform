import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import StudentProfileForm from "./components/StudentProfileForm";
import AlumniProfileForm from "./components/AlumniProfileForm";
import StudentDashboard from "./components/StudentDashboard";
import EditProfileForm from "./components/EditProfileform";
import AlumniDashboard from "./components/AlumniDashboard";
import AlumniDashboard1 from "./components/AlumniDashboard1";
import StudentDashboard1 from "./components/StudentDashboard1";
import EditAlumniProfile from "./components/EditAlumniProfile";
import PostCard from "./components/PostCard";
import AllPosts from "./components/AllPosts";
import CreatePost from "./components/CreatePost";
import Network from "./components/Network";
import JobPost from "./components/JobPost";
import JobCard from "./components/JobCard";
import JobList from "./components/JobList";
import Chat from "./components/Chat";

const samplePost = {
  image: "",
  category: "TECHNOLOGY",
  title: "Why is the Tesla Cybertruck designed the way it is?",
  description: "An exploration into the truck’s polarising design.",
  author: "Carrie Brewer",
  authorAvatar: "https://source.unsplash.com/50x50/?face",
  time: "2 h ago",
  likes: 15
};

const sampleJob = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Solutions Inc.",
  location: "Remote",
  salary: "$80,000 - $100,000",
  experience: "2+ years",
  description: "Build and maintain modern UI applications using React.",
  deadline: "2025-04-30",
  logo: "https://via.placeholder.com/50", // Mock company logo
};

const handleApply = (jobId) => {
  alert(`✅ Application submitted successfully for Job ID: ${jobId}!`);
};

function PostPage() {
  return <PostCard post={samplePost} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-profile/student" element={<StudentProfileForm />} />
        <Route path="/create-profile/alumni" element={<AlumniProfileForm />} />
        <Route path="/create-dashboard/student" element={<StudentDashboard />} />
        <Route path="/create-dashboard/alumni" element={<AlumniDashboard />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard1 />} />
        <Route path="/student-dashboard" element={<StudentDashboard1 />} />
        <Route path="/edit-profile" element={<EditProfileForm />} />
        <Route path="/edit" element={<EditAlumniProfile />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/postall" element={<AllPosts />} />
        <Route path="/postcreate" element={<CreatePost />} />
        <Route path="/network" element={<Network />} />
        <Route path="/job" element={<JobPost />} />
        <Route path="/jobcard" element={<JobCard job={sampleJob} onApply={handleApply} />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}