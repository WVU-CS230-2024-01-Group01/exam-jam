import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/LoginStyles.css";
import axios from 'axios'
import md5 from 'md5'

function Login () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [isProfessor, setIsProfessor] = useState(false); 
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        if (confPassword === password){
            const question = "LOGIN"
            const loginData = {
                question: "LOGIN",
                username,
                password,
            };
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
            <div className="Login">
                <div className="form-box">
                    <Link to="/"><button class="homepageButton"><img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="451.5px" length="164.25px" /></button></Link>
                    <div className="toggle-buttons">
                <button className={isProfessor ? "active" : ""} onClick={() => setIsProfessor(false)}>Student Login</button>
                <button className={!isProfessor ? "active" : ""} onClick={() => setIsProfessor(true)}>Professor Login</button>
                    </div>
                    <h2>{isProfessor ? 'Professor' : 'Student'} Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="info">
                            <input placeholder="Enter username" type="text" name="usernameBox" id="usernameBox" onChange={e => setUsername(e.target.value)}/> <br />
                        </div>
                        <div className="info">
                            <input placeholder="Enter password" type="password" name="passwordBox" id="passwordBox" onChange={e => setPassword((md5(e.target.value)))}/> <br />
                        </div>

                        <div className="info">
                            <input placeholder="Confirm password" type="password" name="passwordConfBox" id="passwordConfBox" onChange={e => setConfPassword((md5(e.target.value)))}/> <br />
                        </div>

                    <div className="buttons">
                        <button type="submit">Login</button>
                        <Link to="/accountcreation"><button type="submit">Create an account</button></Link>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
