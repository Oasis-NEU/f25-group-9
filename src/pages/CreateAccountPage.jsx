import './CreateAccountPage.css';
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";

function CreateAccountPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

 const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : "");  
 }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

      const { error } = await signUp(name, email, password, imageFile);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }

    setLoading(false);
  };

    return (
      <div className="background">
      <div className="createaccount-container">
        <div className="createaccount-label">
        </div>
      <div className="createaccountlabel">
          <label className = "createaccount-label">⋆˚⋆Create an Account⋆☽⋆˚˖ </label>
        </div>

<div className="profileupload">
          <label className="profile-label">Upload a Profile Picture:</label>


       {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="profile-preview"
    />
  )}
     <div className="file-input-wrapper">
  <input
    type="file"
    id="fileUpload"
    accept="image/*"
    onChange={handleImageChange}
    className="profile-input"
  />
  <label htmlFor="fileUpload" className="file-button">
    Choose File
  </label>
</div>

</div>

        <div className="nameinput">
        <label className = "name-label">Name:</label>
        </div>

        <div className="nameinput">
          <input
          className="inputbox"
          type="name"
          onChange={(e) => setName(e.target.value)}
          required
          />
        </div>

      <form onSubmit={handleSubmit}>
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
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
        
                <br></br>
        
                {error && <p className="error">{error}</p>}
                <button className="buttonStyle" type="submit">
                  {" "}
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {success && <p className="success">You created an account! Verify email to login</p>}

                <br></br>

                 <Link to="/login">
                           <button className="buttonStyle">
                             Back {loading}
                           </button>
                         </Link>
              </form>
            </div>
          </div>
          );
        }
        
        export default CreateAccountPage;