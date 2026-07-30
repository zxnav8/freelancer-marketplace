import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostProject.css";

function PostProject() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const project = {
      title,
      description,
      budget,
    };

    const oldProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    oldProjects.push(project);

    localStorage.setItem("projects", JSON.stringify(oldProjects));

    alert("Project Posted Successfully!");

    navigate("/dashboard");
  };

  return (
    <div className="post-container">

      <div className="post-card">

        <h1>Post New Project</h1>

        <p>Share your project and hire the best freelancer.</p>

        <form onSubmit={handleSubmit}>

          <label>Project Title</label>
          <input
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Project Description</label>
          <textarea
            rows="6"
            placeholder="Describe your project..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label>Project Budget (₹)</label>
          <input
            type="number"
            placeholder="Enter Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          <button type="submit">
            Post Project
          </button>

        </form>

      </div>

    </div>
  );
}

export default PostProject;