import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import freelancers from "../data/freelancers";
import "./HireFreelancer.css";

function HireFreelancer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const freelancer = freelancers.find(
    (item) => item.id === Number(id)
  );

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    projectTitle: "",
    budget: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitRequest = (e) => {
    e.preventDefault();

    if (
      !form.clientName ||
      !form.email ||
      !form.projectTitle ||
      !form.budget ||
      !form.deadline ||
      !form.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    const hireRequests =
      JSON.parse(localStorage.getItem("hireRequests")) || [];

    hireRequests.push({
      id: Date.now(),
      freelancerId: freelancer.id,
      freelancerName: freelancer.name,
      freelancerTitle: freelancer.title,
      status: "Pending",
      ...form,
    });

    localStorage.setItem(
      "hireRequests",
      JSON.stringify(hireRequests)
    );

    const notifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

notifications.unshift({
  id: Date.now(),
  title: "New Hire Request",
  message: `${form.clientName} sent a hire request for "${form.projectTitle}".`,
  time: new Date().toLocaleString(),
});

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

    alert("Hire request sent successfully!");

    navigate("/dashboard");
  };

  if (!freelancer) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "60px" }}>
          Freelancer Not Found
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="hire-page">

        <div className="hire-card">

          <h2>Hire {freelancer.name}</h2>

          <p>{freelancer.title}</p>

          <form onSubmit={submitRequest}>
                        <input
              type="text"
              name="clientName"
              placeholder="Your Name"
              value={form.clientName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="projectTitle"
              placeholder="Project Title"
              value={form.projectTitle}
              onChange={handleChange}
            />

            <input
              type="number"
              name="budget"
              placeholder="Project Budget (₹)"
              value={form.budget}
              onChange={handleChange}
            />

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Describe your project..."
              rows="6"
              value={form.description}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="hire-btn">
              Send Hire Request
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default HireFreelancer;