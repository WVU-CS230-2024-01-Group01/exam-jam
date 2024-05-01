import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/LoginStyles.css";
import axios from 'axios'
import md5 from 'md5'

function Login () {
    // State variables for username, password, confirm password, and user type
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [isProfessor, setIsProfessor] = useState(false); 
    // Hook to navigate between pages
    const navigate = useNavigate();

    // Function to handle form submission
    async function handleSubmit(event){
        event.preventDefault();
        // Check if password matches confirm password
        if (confPassword === password){
            const question = "LOGIN"
            const loginData = {
                question: "LOGIN",
                username,
                password,
            };
            // Send login request to server
            await axios.post('http://localhost:8081/accounts', {question, username, password})
            .then( res => {
                // If login successful, store username in local storage and navigate to home page
                if (res.data === "Login Successful") {
                    localStorage.setItem('user', username)
                    navigate("/home")
                }
                // If username or password incorrect, display alert
                else if (res.data === "Username or Password incorrect") {
                    alert("Username or Password incorrect")
                }
                console.log(res)
             } )
            .catch(err => console.log(err))
        }
        // If passwords do not match, display alert
        else {
            alert("Passwords do not match")
        }
    }

    // Component rendering
    return (
        <div>
            <div className="Login">
                <div className="form-box">
                   <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="451.5px" length="164.25px" />
                    <div className="toggle-buttons">
                        {/* Button to toggle between student and professor login */}
                        <button className={isProfessor ? "active" : ""} onClick={() => setIsProfessor(false)}>Student Login</button>
                        <button className={!isProfessor ? "active" : ""} onClick={() => setIsProfessor(true)}>Professor Login</button>
                    </div>
                    {/* Form for login */}
                    <h2>{isProfessor ? 'Professor' : 'Student'} Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="info">
                            {/* Input field for username */}
                            <input placeholder="Enter Username" type="text" name="usernameBox" id="usernameBox" onChange={e => setUsername(e.target.value)}/> <br />
                        </div>
                        <div className="info">
                            {/* Input field for password */}
                            <input placeholder="Enter Password" type="password" name="passwordBox" id="passwordBox" onChange={e => setPassword((md5(e.target.value)))}/> <br />
                        </div>

                        <div className="info">
                            {/* Input field for confirming password */}
                            <input placeholder="Confirm Password" type="password" name="passwordConfBox" id="passwordConfBox" onChange={e => setConfPassword((md5(e.target.value)))}/> <br />
                        </div>

                        <div className="buttons">
                            {/* Button to submit login */}
                            <button type="submit">Login</button>
                            {/* Link to create account page */}
                            <Link to="/accountcreation"><button type="submit">Create Account</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
