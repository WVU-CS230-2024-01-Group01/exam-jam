import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import StudySets from './StudySets';
import "./Classes.css"

export const Classes = () => {

    return (
      <div>
       <link rel="stylesheet" />

        <div className>
         <nav>
           <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="10px" />

           <h1 className="class-title">Class Title{/** How do I retrieve the class title? */}</h1>
           
           <Link to="/"><button className="button-style">Homepage</button></Link>
           <Link to="/profilepage"><button className="button-style">Edit Profile</button></Link>
           <Link to="/logout"><button className="button-style">Logout</button></Link>
                   
          </nav>
          <div id className= "background">
            <div id="study-sets">   
              <StudySets /> 
            </div> 
          </div>     
       </div>
      </div>
    
  );

};

export default Classes;