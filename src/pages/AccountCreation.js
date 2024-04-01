import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import validator from "validator";
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [inputUser, setInputUser] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const navigate = useNavigate();

  const validateEmail = (e) => {
    const email = e.target.value;
    setInputEmail(e.target.value);
    

    if (validator.isEmail(email) || email == "") {
      setEmailMessage("");
    } else {
      setEmailMessage('Please, enter valid Email!');
    }
  };


  function generateRandomNumber() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const sendEmail = (e) => {
    e.preventDefault();

    const randomNum = String(generateRandomNumber());

    const templateParams = {
      username: inputUser,
      user_email: inputEmail,
      code: randomNum,
    };

    emailjs
      .send('service_oefue9b', 'template_mk9ed49', templateParams, {
        publicKey: 'RuQiTX_6jm9UlWhKw',
      })
      .then(() => {
        console.log('SUCCESS!');
        // Navigate to ProfilePage with username and email as query parameters
        navigate(`/profile?username=${inputUser}&email=${inputEmail}`);
      })
      .catch((error) => {
        console.log('FAILED...', error.text);
      });
  };

  return (
    <div class="Login">
      <div class="form-box">
        <h1>Create Your Account</h1>
        <form id="verifyForm">
          <div class="info">
            <label>Enter Username</label>
            <input type="text" name="username" onChange={(e) => setInputUser(e.target.value)}/><br></br>
          </div>
          
          <div class="info">
          <label>Enter Email</label>
          <input type="email" name="user_email" onChange={(e) =>validateEmail(e)} /><br></br>
            <div style={{whiteSpace: 'break-spaces'}}>
              {emailMessage}
            </div>
          </div>
  
          <div class="info">
            <label>Enter A Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
          </div>
  
          <div class="info">
            <label>Confirm Password</label>
            <input type="password" name="passwordConf" id="passwordConf" value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)}/> <br />
          </div>

          <div class="passwordauth">
          <div>
          <PasswordChecklist 
            rules = {["capital", "match", "number", "minLength"]}
            minLength = {8}
            value = {password}
            valueAgain = {matchPassword}
            messages = {{
              minLength: "Minimum length of password should be 8",
              capital: "The password should contain at least 1 capital letter",
              match: "The passwords should match",
              number: "The password should contain a number",
            }}
            />
          </div>
          </div>
  
          <div class="buttons">
            <input type="submit" value="Send Verification Email" onClick={sendEmail} />
            <Link to="/login"><button>Go Back</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
