import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import freelancers from "../data/freelancers";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];
  const savedFreelancers =
    JSON.parse(localStorage.getItem("savedFreelancers")) || [];
  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];
  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  const totalBudget = projects.reduce(
    (total, project) => total + Number(project.budget),
    0
  );

  const totalChats = freelancers.filter((item) =>
    localStorage.getItem(`chat_${item.id}`)
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged Out Successfully!");
    navigate("/");
  };

  const deleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );

    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="dashboard-header">
          <div>
            <h1>
              Welcome, {user ? user.name : "Guest"} 👋
            </h1>

            <p>
              Manage your freelancer account from one place.
            </p>
          </div>

          <button
            className="post-btn"
            onClick={() => navigate("/post-project")}
          >
            + Post Project
          </button>
        </div>

        <div className="stats">

          <div className="stat-card">
            <h2>{projects.length}</h2>
            <p>Total Projects</p>
          </div>

          <div className="stat-card">
            <h2>{savedFreelancers.length}</h2>
            <p>Saved Freelancers</p>
          </div>

          <div className="stat-card">
            <h2>{totalChats}</h2>
            <p>Total Chats</p>
          </div>

          <div className="stat-card">
            <h2>₹ {totalBudget}</h2>
            <p>Total Budget</p>
          </div>

          <div className="stat-card">
            <h2>{orders.length}</h2>
            <p>Total Orders</p>
          </div>

          <div className="stat-card">
            <h2>{notifications.length}</h2>
            <p>Notifications</p>
          </div>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "40px 0 20px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h2>Quick Actions</h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              className="post-btn"
              onClick={() => navigate("/freelancers")}
            >
              Browse Freelancers
            </button>

            <button
              className="edit-btn"
              onClick={() => navigate("/saved")}
            >
              Saved Freelancers
            </button>

            <button
              className="post-btn"
              onClick={() => navigate("/hire-requests")}
            >
              Hire Requests
            </button>

            <button
              className="edit-btn"
              onClick={() => navigate("/orders")}
            >
              Orders
            </button>

            <button
              className="post-btn"
              onClick={() => navigate("/notifications")}
            >
              Notifications
            </button>

            <button
              className="delete-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <h2 style={{ marginBottom: "20px" }}>
          Your Projects
        </h2>

        {projects.length === 0 ? (
          <div className="project-box">
            <h3>No Projects Yet</h3>

            <p>
              Click on "Post Project" to create your first
              project.
            </p>
          </div>
        ) : (
          <div className="project-list">
            {projects.map((project, index) => (
              <div
                className="project-box"
                key={index}
              >
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <h4>
                  Budget : ₹ {project.budget}
                </h4>

                <div className="actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/edit-project/${index}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProject(index)
                    }
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "50px" }}>

          <h2 style={{ marginBottom: "20px" }}>
            Recent Saved Freelancers
          </h2>

          {savedFreelancers.length === 0 ? (
            <div className="project-box">
              <p>No saved freelancers yet.</p>
            </div>
          ) : (
            <div className="project-list">
              {savedFreelancers
                .slice(0, 3)
                .map((id) => {

                  const freelancer =
                    freelancers.find(
                      (item) => item.id === id
                    );

                  if (!freelancer) return null;

                  return (
                    <div
                      className="project-box"
                      key={freelancer.id}
                    >
                      <h3>
                        {freelancer.name}
                      </h3>

                      <p>
                        {freelancer.title}
                      </p>

                      <p>
                        {freelancer.category}
                      </p>

                      <button
                        className="post-btn"
                        style={{
                          marginTop: "15px",
                        }}
                        onClick={() =>
                          navigate(
                            `/freelancer/${freelancer.id}`
                          )
                        }
                      >
                        View Profile
                      </button>
                    </div>
                  );
                })}
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;