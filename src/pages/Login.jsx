import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid Email or Password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login Successful!");

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p>Login to FreelancerHub</p>

        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>

        <div className="signup-link">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;