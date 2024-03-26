import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";

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
    <div>
      <div class="Login">
        <div class="form-box">
          <h1>ExamJam</h1>
          <h2> Create Your Account</h2>
          <form>
            <div class="info">
              <input type="text" placeholder="Enter Username" name="username" onChange={(e) => setInputUser(e.target.value)} /><br></br>
            </div>
            <div class="info">
              <input type="password" placeholder="Enter Password" name="password" id="password" /> <br />
            </div>
            <div class="info">
              <input type="password" placeholder="Confirm Password" name="passwordConf" id="passwordConf" /> <br />
            </div>
            <div class="info">
              <input type="email" placeholder="Enter Email"name="user_email" onChange={(e) => setInputEmail(e.target.value)} /><br></br>
            </div>
            <div class="buttons">
              <button type="submit" onClick={sendEmail}>Verify Email</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
