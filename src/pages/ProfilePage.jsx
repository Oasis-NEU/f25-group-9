import './ProfilePage.css';
function ProfilePage() {

    return (
        <>
            <div class="header">
                <header>
                    <center>
                    <button> <a href="./HomePage"> Feed</a></button>
                    <button> <a href="./HomePage"> DreamScape</a></button>
                    <button> <a href="./LaunchPage"> Logout</a></button>
                    </center>
                </header>
            </div>
            

            <div class="body">
                <center>
                    <div class = "circle"></div>
                    <h1> Welcome to your profile! </h1>
                    <button>Make a Post</button>
                </center>
            </div>

            //make post scroll through dreams
        </>
    )
}

export default ProfilePage