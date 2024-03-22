import React from "react";
import { Link } from "react-router-dom";
import "../pages/LoginStyles.css";
 
function Login () {
    return (
        <div>
            <div class="Login">
                <div class="form-box">
                <h1>ExamJam</h1>
                <h2>Login</h2>
                <form>
                    <div class="info">
                        <label for="username">Enter A Username</label>
                        <input type="text" name="username" id="username" /> <br />
                    </div>
                    <div class="info">
                        <label for="text">Enter A Password</label>
                        <input type="password" name="password" id="password" /> <br />
                    </div>
                    <div class="info">
                        <label for="text">Confirm Password</label>
                        <input type="password" name="passwordConf" id="passwordConf" /> <br />
                    </div>

                    <div class="buttons">
                        <Link to="/home"><button type="submit">Login</button></Link> 
                        <Link to="/accountcreation"><button type="submit">Create an account</button></Link>
                    </div>
                </form>
                </div>
            </div>


        </div>
    )
};
 
export default Login;