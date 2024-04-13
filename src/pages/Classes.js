import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import StudySets from './StudySets';
import "./Classes.css"
import { getDatabase, ref, set, get, child } from "firebase/database";

export const Classes = () => {

    return (
      <div>
       <link rel="stylesheet" />

         <div className="background">
         <nav>
           <h2 className="logo">ExamJam</h2>
           <h1 className="class-title">Class Title{/** How do I retrieve the class title? */}</h1>
           

           <Link to="/"><button>Homepage</button></Link>
           <Link to="/profilepage"><button>Edit Profile</button></Link>
           <Link to="/logout"><button>Logout</button></Link>
                   
        </nav>
         <div id = "study-sets-container">
            <StudySets />
         </div>     
       </div>
       </div>
  );

};

export default Classes;