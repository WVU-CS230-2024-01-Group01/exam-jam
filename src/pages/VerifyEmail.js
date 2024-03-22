import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

 
function VerifyEmail () {
    const [inputCode, setInputCode] = useState("test");
    const navigate = useNavigate();
    const VerifyCode = (e) => {
        e.preventDefault();
        if(String(global.randomNum) == inputCode){
            alert("Successful Verification");
            navigate("/");
        } else {
            alert("Code is incorrect");
        }
      };
    

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