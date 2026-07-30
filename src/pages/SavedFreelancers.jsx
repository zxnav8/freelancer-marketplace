import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Freelancers.css";

function SavedFreelancers() {
  const navigate = useNavigate();

  const [savedFreelancers, setSavedFreelancers] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("savedFreelancers")) || [];

    setSavedFreelancers(data);
  }, []);

  const handleRemove = (id) => {
    const updated = savedFreelancers.filter(
      (item) => item.id !== id
    );

    setSavedFreelancers(updated);

    localStorage.setItem(
      "savedFreelancers",
      JSON.stringify(updated)
    );
  };

  return (
    <>
      <Navbar />

      <div className="freelancer-page">
        <h1>❤️ Saved Freelancers</h1>

        {savedFreelancers.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            No Saved Freelancers
          </h2>
        ) : (
          <div className="freelancer-grid">
            {savedFreelancers.map((item) => (
              <div className="freelancer-box" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="freelancer-image"
                />

                <h2>{item.name}</h2>

                <p>{item.title}</p>

                <p>⭐ {item.rating}</p>

                <h3>{item.rate}</h3>

                <div className="freelancer-actions">
                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(`/freelancer/${item.id}`)
                    }
                  >
                    View Profile
                  </button>

                  <button
                    className="hire-btn"
                    onClick={() =>
                      handleRemove(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SavedFreelancers;