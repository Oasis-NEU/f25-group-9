import "./ProfilePage.css";
import { useState, useEffect, use } from "react";
import { supabase } from "../../supabase.js";

function ProfilePage() {
  const [fetchError, setFetchError] = useState(null);
  const [dreams, setDreams] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [pfp, setPfp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        setDisplayName(user.user_metadata.name);
        setPfp(user.user_metadata.avatar_url);

        const { data, error: dreamsError } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user.id);

        if (dreamsError) throw dreamsError;

        setDreams(data.reverse());
        setFetchError(null);
      } catch (err) {
        console.log(err);
        setFetchError("Could not load page data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) window.location.href = "/launch";
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Loading your DreamScape...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <nav>
          <button>
            {" "}
            <a href="./home"> Feed</a>
          </button>
          <button>
            {" "}
            <a href="./launch"> DreamScape</a>
          </button>
          <button onClick={handleLogout}>
            <a>Logout</a>
          </button>
        </nav>
      </div>

      <div className="profile-container">
        {pfp && <img src={pfp} className="profile-pic" />}
        <h1>
          Welcome to your DreamScape, {displayName ? displayName : "Loading..."}
        </h1>
        <p className="bio">Below lies your subconscious</p>
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
              <div className="dream-item" key={dream.id}>
                <div className="dream-text">
                  <h3>{dream.title}</h3>
                  <p className="dream-body">{dream.body}</p>

                  <div className="tag-container">
                    {JSON.parse(dream.tags).map((tag) => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {dream.image_url && (
                  <img src={dream.image_url} className="dream-item-img" />
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
