import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

 
function VerifyEmail () {
    const [inputCode, setInputCode] = useState("");
    const navigate = useNavigate();
    
    const VerifyCode = (e) => {
        e.preventDefault();
        let code = localStorage.getItem('code')
        console.log(code)
        if(String(code) === inputCode){
            alert("Successful Verification");
            addAccount()
            navigate("/login")
        } else {
            alert("Code is incorrect");
        }
      };

      async function addAccount(){
        let question = "CREATE"
        let email = localStorage.getItem('email')
        let username = localStorage.getItem('username')
        let password = localStorage.getItem('password')
        await axios.post('http://localhost:8081/accounts', {question, email, username, password})
        .then (
            localStorage.clear()
        )
        .catch (
            err => console.log(err)
        )
      }
    

    return (
        <div>
            <h1>Verify Email</h1>

            <div class="verification">
                <label>Enter Code</label>
                <input type='text' name='verifyCode' onChange={(e) => setInputCode(e.target.value)}></input>
                <input type="submit" value="Verify" onClick={VerifyCode} ></input>
            </div>


        </div>
    )
};
 
export default VerifyEmail;