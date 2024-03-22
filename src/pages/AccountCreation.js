import React, {useState} from 'react';
import emailjs from '@emailjs/browser';
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [inputUser, setInputUser] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  var templateParams = {
    username: '',
    user_email: '',
    code: '',
  }
  global.randomNum = 0;

<<<<<<< HEAD
            <div class="accCreate">
                <label for="email">Enter a Email</label>
                <input type="email" name="email" id="email" /> <br />

                <label for="username">Enter a Username</label>
                <input type="text" name="username" id="username" /> <br />

                <label for="password">Enter a Password</label>
                <input type="password" name="password" id="password" /> <br />

                <label for="password">Confirm Password</label>
                <input type="password" name="passwordConf" id="passwordConf" /> <br />
                
                <Link to="/login"><button>Create</button></Link> 
            </div>
=======
  const navigate = useNavigate();

  function generateRandomNumber() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

  const sendEmail = (e) => {
    e.preventDefault();
     
    global.randomNum = String(generateRandomNumber());
    templateParams.username = inputUser;
    templateParams.user_email = inputEmail;
    templateParams.code = global.randomNum;
>>>>>>> 0cede597d49c07c6964ee0e8023cf3bc964fc1b8

    emailjs
      .send('service_oefue9b', 'template_mk9ed49', templateParams , {
        publicKey: 'RuQiTX_6jm9UlWhKw',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      navigate("/verifyemail");
      //document.getElementById("verifyForm").reset();
  };

  return (
    <div>
      <h1> Create Your Account</h1>
      <form id="verifyForm" >
        <label>Username</label>
        <input type="text" name="username" onChange={(e) => setInputUser(e.target.value)}/><br></br>
        
        <label>Email</label>
        <input type="email" name="user_email" onChange={(e) => setInputEmail(e.target.value)}/><br></br>

        <label>Enter A Password</label>
        <input type="password" name="password" id="password" /> <br />

        <label>Confirm Password</label>
        <input type="password" name="passwordConf" id="passwordConf" /> <br />
          <input type="submit" value="Send Verification Email" onClick={sendEmail} />
      </form>
    </div>
  );
};

export default CreateAccount;