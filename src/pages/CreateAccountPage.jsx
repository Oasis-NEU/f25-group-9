import './CreateAccountPage.css';
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";

function CreateAccountPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

      const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }

    setLoading(false);
  };

    return (
      <div className="background">
        <div className="CreateanAccount">
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          className="inputbox"
          type="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div></div>
        
                <label>Password:</label>
                <input
                  className="inputbox"
                  type="password"
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
        
                <br></br>
        
                {error && <p className="error">{error}</p>}
                <button className="Create" type="submit">
                  {" "}
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {success && <p className="success">You created an account! Redirecting...</p>}
              </form>
            </div>
          </div>
          );
        }
        
        export default CreateAccountPage;