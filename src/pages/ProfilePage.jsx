import "./ProfilePage.css";
function ProfilePage() {
  const dreams = [
    "This is one of my dreams",
    "This is another one of my dreams",
    "Link this to the database",
  ];

  return (
    <>
      <div class="header">
        <nav>
          <button>
            {" "}
            <a href="./HomePage"> Feed</a>
          </button>
          <button>
            {" "}
            <a href="./HomePage"> DreamScape</a>
          </button>
          <button>
            {" "}
            <a href="./LaunchPage"> Logout</a>
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
          {dreams.map((dream, index) => (
            <div key={index} className="dream-item">
              {dream}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
