import React from "react";
import { Link } from "react-router-dom";
 
function Login () {
    return (
        <div>
            <h1>Login</h1>

            <div class="Login">

                <label for="username">Enter Username</label>
                <input type="text" name="username" id="username" /> <br />

                <label for="text">Enter Password</label>
                <input type="password" name="password" id="password" /> <br />

                <Link to="/home"><button type="submit">Login</button></Link> 
                <Link to="/accountcreation"><button type="submit">Create an account</button></Link>
            </div>


        </div>
    )
};
 
export default Login;