import './LaunchPage.css';
function LaunchPage() {

    return (
        <>
        <div class ="hometab">
            <div>
            <button>
            <a href="./launch"> Home</a>
            </button>
            <button>About</button>
            <label class = "dslabel">Dreamscape</label>
        </div>
            
        </div>

        
        <div class ="quote">
             <h2>Imagination is the beginning of creation </h2>
             <h3>Start dreaming today</h3>
        </div>

        <div> 
            <img src= "icon.png"/>
        </div>

     <div class ="loginbutton">
            <button>
            <a href="./login"> Login</a>
            </button>
        </div>

        <div class="about">
             <h2>About</h2>    
            <p>Description on dreamscape</p>
        </div>
        </>
        
    )
}

export default LaunchPage
