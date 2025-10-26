import './LoginPage.css';
function LoginPage() {

    return (
        <>
            <div class="log">
            <h1>Login</h1>
             <label>Username:</label>
             <input className='inputbox'></input> <div></div>
             <label>Password:</label> 
             <input className='inputbox' minlength="8"></input> 
             <input className="submit" type="submit" value="Sign in" />
             <br></br>
             <button>create an account</button>
        </div>

        </>
    )
}

export default LoginPage