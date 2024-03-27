import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [inputUser, setInputUser] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const navigate = useNavigate();

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
            <input type="email" name="user_email" onChange={(e) => setInputEmail(e.target.value)}/><br></br>
          </div>
  
          <div class="info">
            <label>Enter A Password</label>
            <input type="password" name="password" id="password" /> <br />
          </div>
  
          <div class="info">
            <label>Confirm Password</label>
            <input type="password" name="passwordConf" id="passwordConf" /> <br />
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
