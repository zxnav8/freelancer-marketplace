import "./FeaturedFreelancers.css";
import { useNavigate } from "react-router-dom";
import freelancers from "../data/freelancers";

function FeaturedFreelancers() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleHire = (freelancer) => {
    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    navigate(`/hire/${freelancer.id}`);
  };

  const handleViewProfile = (id) => {
    navigate(`/freelancer/${id}`);
  };

  return (
    <section className="freelancers">
      <h2>Featured Freelancers</h2>

      <p>Top rated professionals ready to work</p>

      <div className="freelancer-grid">
        {freelancers.map((item) => (
          <div className="freelancer-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <p>{item.title}</p>

            <div className="rating">
              ⭐ {item.rating} ({item.reviews} Reviews)
            </div>

            <h4>{item.rate}</h4>

            <div className="freelancer-buttons">
              <button
                className="view-btn"
                onClick={() => handleViewProfile(item.id)}
              >
                View Profile
              </button>

              <button
                className="hire-btn"
                onClick={() => handleHire(item)}
              >
                Hire Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedFreelancers;