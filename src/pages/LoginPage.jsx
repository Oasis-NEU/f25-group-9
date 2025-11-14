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
         <div className="loginlabel">
        </div>
      <form onSubmit={handleLogin}>
        <div className="loginlabel">
          <label className = "login-label">⋆˖☽⋆˚⋆Login⋆˖☽⋆˚˖ </label>
        </div>
        <div className="emailinput">
          <label className = "email-label">Email:</label>
        </div>
        
        <div className="emailinput">
        <input
          className="inputbox"
          type="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />    
        </div>

        <div className="passwordinput">
          <label className = "password-label">Password:</label>
        </div>

        <div className="passwordinput">
        <input
          className="inputbox"
          type="password"
          minlength="8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="buttonStyle" type="Login">
          {loading} {loading ? "Logging in...⋆｡˚ ☁︎ ˚｡⋆｡˚☽˚｡⋆" : "Login"}{" "}
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
