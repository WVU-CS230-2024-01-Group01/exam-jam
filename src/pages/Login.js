import React from "react";
import { Link } from "react-router-dom";
 
function Login () {
    return (
        <div>
            <h1>Login</h1>

            <div class="Login">

                <label for="username">Enter A Username</label>
                <input type="text" name="username" id="username" /> <br />

                <label for="text">Enter A Password</label>
                <input type="password" name="password" id="password" /> <br />

                <label for="text">Confirm Password</label>
                <input type="password" name="passwordConf" id="passwordConf" /> <br />

                <Link to="/home"><button type="submit">Login</button></Link> 
                <Link to="/accountcreation"><button type="submit">Create an account</button></Link>
            </div>


        </div>
    )
};
 
export default Login;