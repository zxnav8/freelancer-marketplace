import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostProject.css";

function PostProject() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const project = {
      id: Date.now(),
      title,
      description,
      budget,
      owner: currentUser.email,
    };

    const storageKey = `projects_${currentUser.email}`;

    const oldProjects =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    oldProjects.push(project);

    localStorage.setItem(storageKey, JSON.stringify(oldProjects));

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