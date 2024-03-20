import React from "react";
import { Link } from "react-router-dom";

function AccountCreation () {
    return (
        <div>
            <h1>Create an account</h1>

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


        </div>
    )
};
 
export default AccountCreation;