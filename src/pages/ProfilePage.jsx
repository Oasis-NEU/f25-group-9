import "./ProfilePage.css";
import { useState, useEffect, use } from "react";
import { supabase } from "../../supabase.js";

function ProfilePage() {
  const dreamsTests = [
    "This is one of my dreams",
    "This is another one of my dreams",
    "Link this to the database",
  ];

  const [fetchError, setFetchError] = useState(null);
  const [dreams, setDreams] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const loadUserName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setDisplayName(user.user_metadata.email);
      }
      if (error) {
        console.log(error);
        setFetchError("Dreamer");
      }
    };

    loadUserName();
  }, []);

  useEffect(() => {
    const fetchDreams = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.log(error);
        setFetchError("Could not load dreams");
      } else {
        setFetchError(null);
        setDreams(data);
      }
    };

    fetchDreams();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error signing out:", error.message);
    } else {
      // Redirect the user after logout, e.g., to login page
      window.location.href = "/launch"; // or wherever your login page is
    }
  };

  return (
    <>
      <div class="header">
        <nav>
          <button>
            {" "}
            <a href="./home"> Feed</a>
          </button>
          <button>
            {" "}
            <a href="./home"> DreamScape</a>
          </button>
          <button onClick={handleLogout}>
            <a>Logout</a>
          </button>
        </nav>
      </div>

      <div className="profile-container">
        <img
          src="public/dreamscape__1_-removebg-preview.png"
          alt="Profile Picture"
          className="profile-pic"
        />

        <h1> Welcome to your DreamScape, {displayName} </h1>
        <p className="bio">Below here lies your subconscious</p>
        <button className="post-btn">
          <a href="./Post">Make a Post</a>
        </button>
        <p></p>
        <button className="post-btn">
          <a href="./Analysis">Analyze a Previous Dream</a>
        </button>
      </div>
      <div className="dream-scroll">
        <h3 className="dream-title"> Logged Dreams </h3>
        <div className="scroll-container">
          {fetchError && <p>{fetchError}</p>}
          {dreams &&
            dreams.map((dream) => (
              <p class="dream-item">
                {dream.title}
                <p class="dream-body">{dream.body}</p>
                <img
                  src={dream.image_url}
                  alt="Profile Picture"
                  className="post-image"
                />
              </p>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
