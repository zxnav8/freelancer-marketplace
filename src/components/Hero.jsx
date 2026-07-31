import "./Hero.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Hero() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSearch = () => {
    if (search.trim() === "") {
      alert("Please enter a skill or category.");
      return;
    }

    navigate("/freelancers", {
      state: {
        search: search.trim(),
      },
    });
  };

  const handleHire = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    navigate("/freelancers");
  };

  const handleBecome = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Find the Perfect <span>Freelancer</span> for Your Project
        </h1>

        <p>
          Hire skilled professionals or showcase your talent to clients around
          the world.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search React, UI/UX, AI, Content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="hero-buttons">
          <button className="hire-btn" onClick={handleHire}>
            Hire Freelancer
          </button>

          <button className="work-btn" onClick={handleBecome}>
            Become Freelancer
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <h2>500+</h2>
            <p>Freelancers</p>
          </div>

          <div>
            <h2>1200+</h2>
            <p>Projects</p>
          </div>

          <div>
            <h2>98%</h2>
            <p>Success Rate</p>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700"
          alt="Freelancers"
        />
      </div>
    </section>
  );
}

export default Hero;