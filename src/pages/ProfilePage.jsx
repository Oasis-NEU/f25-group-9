import "./ProfilePage.css";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase.js";
function ProfilePage() {
  const dreamsTests = [
    "This is one of my dreams",
    "This is another one of my dreams",
    "Link this to the database",
  ];

  const [fetchError, setFetchError] = useState(null);
  const [dreams, setDreams] = useState(null);

  useEffect(() => {
    const fetchDreams = async () => {
      const { data, error } = await supabase.from("posts").select();
      if (error) {
        setFetchError("Could not fetch dreams");
        setDreams(null);
        console.log(error);
      }
      if (data) {
        setDreams(data);
        setFetchError(null);
      }
    };
    fetchDreams();
  }, []);

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
          <button>
            {" "}
            <a href="./launch"> Logout</a>
          </button>
        </nav>
      </div>

      <div className="profile-container">
        <img
          src="public/dreamscape__1_-removebg-preview.png"
          alt="Profile Picture"
          className="profile-pic"
        />

        <h1> Welcome to your DreamScape⭐️</h1>
        <p className="bio">Below here lies your subconscious</p>
        <button className="post-btn">
          <a href="./Post">Make a Post</a>
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
