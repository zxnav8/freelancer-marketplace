import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#2563eb",
          }}
        >
          FreelancerHub
        </Link>
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/freelancers">Freelancers</Link>
        </li>

        <li>
          <Link to="/post-project">Projects</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        {user && (
          <>
            <li>
              <Link to="/saved">❤️ Saved</Link>
            </li>

            <li>
              <Link to="/hire-requests">📥 Hire Requests</Link>
            </li>

            <li>
              <Link to="/notifications">🔔 Notifications</Link>
            </li>
          </>
        )}

        {user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="login-btn" to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link className="signup-btn" to="/signup">
                Sign Up
              </Link>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;