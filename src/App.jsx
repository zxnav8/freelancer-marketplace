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

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/freelancers" element={<Freelancers />} />
      <Route path="/freelancer/:id" element={<FreelancerProfile />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-project"
        element={
          <ProtectedRoute>
            <PostProject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-project/:id"
        element={
          <ProtectedRoute>
            <EditProject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <SavedFreelancers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat/:id"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hire/:id"
        element={
          <ProtectedRoute>
            <HireFreelancer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hire-requests"
        element={
          <ProtectedRoute>
            <HireRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;