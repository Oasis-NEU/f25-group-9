import './LaunchPage.css';
function LaunchPage() {

    return (
        <>
        <div class ="hometab">
            <button>Home</button>
            <button>About</button>
            <label>Dreamscape</label>
        </div>
      
        <div> 
            <img src= "icon.png"/>
        </div>

        <div class ="loginbutton">
            <button>
            <a href="./login"> Login</a>
            </button>
        </div>
        
        <div class ="quote">
             <h2>Imagination is the beginning of creation </h2>
             <h3>Start dreaming today</h3>
        </div>

        <div class="about">
             <h2>About</h2>    
            <p>Description on dreamscape</p>
            <img class = "background" src="public/aboutbackground.png"/>
        </div>
        </>
        
    )
}

export default LaunchPage
