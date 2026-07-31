import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No account found. Please Signup first.");
      return;
    }

    if (email === user.email && password === user.password) {

      // Login state save
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Login Successful!");
      navigate("/dashboard");

    } else {
      alert("Invalid Email or Password");
    }
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

          <button type="submit">
            Login
          </button>

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