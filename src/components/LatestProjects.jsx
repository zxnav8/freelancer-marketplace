import "./LatestProjects.css";
import { useNavigate } from "react-router-dom";

function LatestProjects() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const projects = [
    {
      title: "E-Commerce Website",
      category: "Web Development",
      budget: "$500",
      description: "Need a responsive React e-commerce website."
    },
    {
      title: "Mobile App UI Design",
      category: "UI/UX Design",
      budget: "$300",
      description: "Design a modern Android & iOS app interface."
    },
    {
      title: "Portfolio Website",
      category: "Frontend",
      budget: "$200",
      description: "Create a personal portfolio using React."
    }
  ];

  const handleApply = (title) => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    alert(`Application submitted for "${title}"`);
  };

  return (
    <section className="projects">
      <h2>Latest Projects</h2>

      <p>Browse the newest freelance jobs</p>

      <div className="project-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <span className="category">{project.category}</span>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="project-footer">
              <h4>{project.budget}</h4>

              <button onClick={() => handleApply(project.title)}>
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestProjects;