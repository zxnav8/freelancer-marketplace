import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "60px", textAlign: "center" }}>
        <h1>About FreelancerHub</h1>

        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          FreelancerHub is an online marketplace where clients can post
          projects and freelancers can find work. This project is built using
          React.js, JavaScript, HTML, CSS and LocalStorage.
        </p>

        <h2 style={{ marginTop: "40px" }}>Our Features</h2>

        <ul
          style={{
            listStyle: "none",
            marginTop: "20px",
            lineHeight: "40px",
            fontSize: "18px",
          }}
        >
          <li>✔ User Authentication</li>
          <li>✔ Project Posting</li>
          <li>✔ Dashboard</li>
          <li>✔ Project Management</li>
          <li>✔ Profile Management</li>
        </ul>
      </div>
    </>
  );
}

export default About;