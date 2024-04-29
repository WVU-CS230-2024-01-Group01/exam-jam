import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, Link } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import validator from "validator";
import md5 from 'md5';

const CreateAccount = () => {
  const [inputUser, setInputUser] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordValidity, setValidity] = useState(false);
  const [isProfessor, setIsProfessor] = useState(false); // New state for tracking user type

  const navigate = useNavigate();

  const handleChangePassword = (isValid, _) => {
    setValidity(isValid)
  }

  const validateEmail = (e) => {
    const email = e.target.value;
    setInputEmail(e.target.value);
    

    if (validator.isEmail(email) || email === "") {
      setEmailMessage("");
    } else {
      setEmailMessage('Please, enter valid Email!');
    }
  };

  function generateRandomNumber() {
    const crypto = window.crypto;
    var array = new Uint32Array(1);
    return crypto.getRandomValues(array);
  }

  const sendEmail = (e) => {
    e.preventDefault();

    const randomNum = String(generateRandomNumber());

    const templateParams = {
      username: inputUser,
      user_email: inputEmail,
      code: randomNum,
    };

    let md5Password = md5(password)

    emailjs
      .send('service_oefue9b', 'template_mk9ed49', templateParams, {
        publicKey: 'RuQiTX_6jm9UlWhKw',
      })
      .then(() => {
        console.log('SUCCESS!');
        
        localStorage.setItem('code', randomNum)
        localStorage.setItem('email', inputEmail)
        localStorage.setItem('username', inputUser)
        localStorage.setItem('password', md5Password)

      
        navigate("/verifyemail");

      })
      .catch((error) => {
        console.log('FAILED...', error.text);
      });
  };

  return (
    <div className="Login">
      <div className="form-box">
      <h1>Create {isProfessor ? "Professor" : "Student"} Account</h1>
        
        <div className="toggle-buttons">
          <button className={isProfessor ? "active" : ""} onClick={() => setIsProfessor(false)}>Student Account</button>
          <button className={!isProfessor ? "active" : ""} onClick={() => setIsProfessor(true)}>Professor Account</button>
        </div>

        <form id="verifyForm">
          <div className="info">
            <label>Enter Username</label>
            <input type="text" name="username" onChange={(e) => setInputUser(e.target.value)}/><br></br>
          </div>
          
          <div className="info">
            <label>Enter Email</label>
            <input type="email" name="user_email" onChange={(e) =>validateEmail(e)} /><br></br>
            <div style={{whiteSpace: 'break-spaces'}}>
              {emailMessage}
            </div>
          </div>
  
          <div className="info">
            <label>Enter A Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
          </div>
  
          <div className="info">
            <label>Confirm Password</label>
            <input type="password" name="passwordConf" id="passwordConf" value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)}/> <br />
          </div>


          <div className="passwordauth">
            <div>
              <PasswordChecklist 
                rules = {["capital", "match", "number", "minLength", "notEmpty"]}
                minLength = {8}
                value = {password}
                valueAgain = {matchPassword}
                messages = {{
                  minLength: "Minimum length of password should be 8",
                  capital: "The password should contain at least 1 capital letter",
                  match: "The passwords should match",
                  number: "The password should contain a number",
                }}
                onChange = {handleChangePassword}
              />
            </div>
          </div>
  
          <div className="buttons">
            <input type="submit" value="Send Verification Email" onClick={sendEmail} disabled={!passwordValidity || (inputUser.length < 5) || !validator.isEmail(inputEmail)}/>
            <Link to="/login"><button>Go Back</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
