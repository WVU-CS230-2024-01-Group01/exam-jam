import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./Classes.css"

export const Classes = () => {
  const [course,setCourse]= useState([]);
  const [studyset,setStudySet]= useState([]);

  const location = useLocation()
  const courseId = location.pathname.split("/")[2];

    useEffect(()=>{
        const fetchSingleCourse = async ()=>{
            try{
                const res = await axios.get(`http://localhost:8081/classes/${courseId}`)
                setCourse(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchSingleCourse()
    },[courseId])

    useEffect(()=>{
      const fetchSingleStudySet = async ()=>{
          try{
              const res = await axios.get(`http://localhost:8081/studysets/by-class/${courseId}`)
              setStudySet(res.data)
          }catch(err){
              console.log(err)
          }
      }
      fetchSingleStudySet()
  },[courseId])

    return (
      <div>
       <link rel="stylesheet" />

        <div className>
         <nav>
           <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="10px" />
           <div>
              {course.map(course=>(
                      <h1 className="class-title">{course.title}</h1>
              ))}
            </div>
           <Link to="/"><button className="button-style">Homepage</button></Link>
           <Link to="/profilepage"><button className="button-style">Edit Profile</button></Link>
           <Link to="/logout"><button className="button-style">Logout</button></Link>      
          </nav>
          <div id className= "background">
            <div id="study-sets">  
            {studyset.map(studyset=>(
                <div className="studyset" key={studyset.ss_id}>
                    <h1>{studyset.title}</h1>
                    <button className="editstudysets"><Link to={`/editstudysets/${studyset.ss_id}`}>Edit</Link></button>
                </div>
            ))}
            </div> 
          </div>     
       </div>
      </div>
    
  );

};

export default Classes;