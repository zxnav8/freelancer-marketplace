import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const storageKey = `projects_${currentUser.email}`;

    const projects =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    const project = projects[id];

    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setBudget(project.budget);
    }
  }, [id, currentUser, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const storageKey = `projects_${currentUser.email}`;

    const projects =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    projects[id] = {
      ...projects[id],
      title,
      description,
      budget,
    };

    localStorage.setItem(
      storageKey,
      JSON.stringify(projects)
    );

    alert("Project Updated Successfully!");

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Edit Project</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Update Project
        </button>
      </form>
    </div>
  );
}

export default EditProject;