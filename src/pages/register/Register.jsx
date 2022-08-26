import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(true);
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      console.log(["Couldn't register this user", error]);
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">REGISTER</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter Your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton">Register</button>
      </form>
      <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
        <button type="submit" className="registerLoginButton">
          Login
        </button>
        {error && (
          <span style={{ color: "red", marginTop: "50px" }}>
            Something went wrong
          </span>
        )}
      </Link>
    </div>
  );
}

export default Register;
