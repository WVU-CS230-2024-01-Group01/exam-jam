import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/LoginStyles.css";
import axios from 'axios'
import md5 from 'md5'
 
function Login () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        let question = "LOGIN"
        if (confPassword === password){
            await axios.post('http://localhost:8081/accounts', {question, username, password})
            .then( res => {
                if (res.data === "Login Successful") {
                    localStorage.setItem('user', username)
                    navigate("/")
                }
                else if (res.data === "Username or Password incorrect") {
                    alert("Username or Password incorrect")
                }
                console.log(res)
             } )
            .catch(err => console.log(err))
        }
        else {
            alert("Passwords do not match")
        }
    }

    return (
        <div>
            <div class="Login">
                <div class="form-box">
                <h1>ExamJam</h1>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div class="info">
                        <label for="username">Enter A Username</label>
                        <input type="text" name="usernameBox" id="usernameBox" onChange={e => setUsername(e.target.value)}/> <br />
                    </div>
                    <div class="info">
                        <label for="password">Enter A Password</label>
                        <input type="password" name="passwordBox" id="passwordBox" onChange={e => setPassword((md5(e.target.value)))}/> <br />
                    </div>
                    <div class="info">
                        <label for="passwordConf">Confirm Password</label>
                        <input type="password" name="passwordConfBox" id="passwordConfBox" onChange={e => setConfPassword((md5(e.target.value)))}/> <br />
                    </div>

                    <div class="buttons">
                        <button type="submit">Login</button>
                        <Link to="/accountcreation"><button type="submit">Create an account</button></Link>
                    </div>
                    <Link to="/"><button class="homepageButton">Homepage</button></Link>
                    
                </form>
                </div>
            </div>


        </div>
    )
};
 
export default Login;