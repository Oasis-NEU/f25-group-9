import "./LoginPage.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      navigate("/profile");
    }

    setLoading(false);
  };

  return (
    <div className="background">    
      <div className="log-container">
        <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          className="inputbox"
          type="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br></br>

        <label>Password:</label>
        <input
          className="inputbox"
          type="password"
          minlength="8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <br></br>

        {error && <p className="error">{error}</p>}

        <button className="buttonStyle" type="Login">
          {loading} {loading ? "Logging in..." : "Login"}{" "}
        </button>

       <br></br>

        <Link to="/createaccount">
          <button className="buttonStyle">
            Create an Account {loading}
          </button>
        </Link>
      </form>
    </div>
   </div>
  );
}

export default LoginPage;
