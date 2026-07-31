import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      alert("Account already exists. Please Login.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created Successfully!");

    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Create Account</h1>

        <p>Join FreelancerHub Today</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Create Account</button>
        </form>

        <div className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;