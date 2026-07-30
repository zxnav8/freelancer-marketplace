import Navbar from "../components/Navbar";
import "./Freelancers.css";
import { useLocation, useNavigate } from "react-router-dom";
import freelancers from "../data/freelancers";

function Freelancers() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCategory = location.state?.category || "All Categories";
  const searchText = location.state?.search?.toLowerCase() || "";

  const user = JSON.parse(localStorage.getItem("user"));

  let filteredFreelancers = freelancers;

  // Category Filter
  if (selectedCategory !== "All Categories") {
    filteredFreelancers = filteredFreelancers.filter(
      (item) => item.category === selectedCategory
    );
  }

  // Search Filter
  if (searchText !== "") {
    filteredFreelancers = filteredFreelancers.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.title.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText) ||
        item.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        )
      );
    });
  }

  const handleHire = (freelancer) => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    alert(`Hire request sent to ${freelancer.name}`);
  };

  const handleViewProfile = (id) => {
    navigate(`/freelancer/${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="freelancer-page">
        <h1>
          {searchText
            ? `Search Results for "${location.state.search}"`
            : selectedCategory}
        </h1>

        {filteredFreelancers.length === 0 ? (
          <h2 style={{ textAlign: "center", marginTop: "40px" }}>
            No freelancers found.
          </h2>
        ) : (
          <div className="freelancer-grid">
            {filteredFreelancers.map((item) => (
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
        )}
      </div>
    </>
  );
}

export default Freelancers;