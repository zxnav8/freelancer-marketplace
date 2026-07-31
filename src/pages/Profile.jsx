import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">👤</div>

          <h1>{currentUser ? currentUser.name : "Guest"}</h1>

          <p>FreelancerHub User</p>

          <div className="profile-info">
            <div className="info-box">
              <h3>Full Name</h3>
              <span>{currentUser ? currentUser.name : "-"}</span>
            </div>

            <div className="info-box">
              <h3>Email</h3>
              <span>{currentUser ? currentUser.email : "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
