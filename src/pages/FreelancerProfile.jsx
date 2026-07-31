import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import freelancers from "../data/freelancers";
import "./FreelancerProfile.css";

function FreelancerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const freelancer = freelancers.find(
    (item) => item.id === Number(id)
  );

  const storageKey = currentUser
    ? `savedFreelancers_${currentUser.email}`
    : null;

  const [saved, setSaved] = useState(() => {
    if (!storageKey) return false;

    const savedFreelancers =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    return savedFreelancers.some(
      (item) => item.id === Number(id)
    );
  });

  if (!freelancer) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Freelancer Not Found
      </h2>
    );
  }

  const handleHire = () => {
    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    navigate(`/hire/${freelancer.id}`);
  };

  const handleChat = () => {
    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    navigate(`/chat/${freelancer.id}`);
  };

  const handleSave = () => {
    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    let savedFreelancers =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    if (
      !savedFreelancers.some(
        (item) => item.id === freelancer.id
      )
    ) {
      savedFreelancers.push(freelancer);

      localStorage.setItem(
        storageKey,
        JSON.stringify(savedFreelancers)
      );

      setSaved(true);

      alert("Freelancer saved successfully!");
    } else {
      alert("Freelancer already saved.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">
          <img
            src={freelancer.image}
            alt={freelancer.name}
          />

          <h1>{freelancer.name}</h1>

          <h3>{freelancer.title}</h3>

          <p>📍 {freelancer.location}</p>

          <div className="profile-rating">
            ⭐ {freelancer.rating} (
            {freelancer.reviews} Reviews)
          </div>

          <div className="profile-info">
            <div>
              <h4>Experience</h4>
              <p>{freelancer.experience}</p>
            </div>

            <div>
              <h4>Projects</h4>
              <p>{freelancer.completedProjects}</p>
            </div>

            <div>
              <h4>Rate</h4>
              <p>{freelancer.rate}</p>
            </div>
          </div>

          <h2>About</h2>

          <p>{freelancer.about}</p>

          <h2>Skills</h2>

          <div className="skills">
            {freelancer.skills.map(
              (skill, index) => (
                <span key={index}>{skill}</span>
              )
            )}
          </div>

          <div className="profile-buttons">
            <button
              className="post-btn"
              onClick={handleHire}
            >
              Hire Freelancer
            </button>

            <button
              className="chat-btn"
              onClick={handleChat}
            >
              Chat
            </button>

            <button
              className="view-btn"
              onClick={handleSave}
            >
              {saved ? "❤️ Saved" : "🤍 Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FreelancerProfile;