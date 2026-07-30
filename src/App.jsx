import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PostProject from "./pages/PostProject";
import EditProject from "./pages/EditProject";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Freelancers from "./pages/Freelancers";
import FreelancerProfile from "./pages/FreelancerProfile";
import SavedFreelancers from "./pages/SavedFreelancers";
import Chat from "./pages/Chat";
import HireFreelancer from "./pages/HireFreelancer";
import HireRequests from "./pages/HireRequests";
import Notifications from "./pages/Notifications";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/post-project" element={<PostProject />} />
      <Route path="/edit-project/:id" element={<EditProject />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/freelancers" element={<Freelancers />} />
      <Route path="/freelancer/:id" element={<FreelancerProfile />} />
      <Route path="/saved" element={<SavedFreelancers />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/hire/:id" element={<HireFreelancer />} />
      <Route path="/hire-requests" element={<HireRequests />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/orders" element={<Orders />} />
     <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default App;