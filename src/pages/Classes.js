import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./Classes.css"

export const Classes = () => {
  const [course,setCourse]= useState([]);
  const [studysets,setStudySets]= useState([]);

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
      const fetchStudySets = async ()=>{
          try{
              const res = await axios.get(`http://localhost:8081/studysets/by-class/${courseId}`)
              setStudySets(res.data)
          }catch(err){
              console.log(err)
          }
      }
      fetchStudySets()
  },[courseId])

  const handleDelete = async (ss_id) =>{
    try{
        let res = await axios.delete(`http://localhost:8081/studysets/${ss_id}`);
        let question = "DELETE_CREATEDSET"
        console.log(ss_id)
        await axios.put("http://localhost:8081/accounts/", {question, ss_id}) 
        setStudySets(studysets.filter(set => set.ss_id !== ss_id));
    }catch(err){
        console.log(err)
    }
}

    return (
      <div>
       <link rel="stylesheet" />

        <div className="background">
         <nav>
           <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="10px" />
           <div>
              {course.map(course=>(
                      <h1 className="class-title">{course.title}</h1>
              ))}
            </div>
           <Link to="/home"><button className="button-style">Homepage</button></Link>
           <Link to="/profilepage"><button className="button-style">Edit Profile</button></Link>
           <Link to="/logout"><button className="button-style">Logout</button></Link>      
          </nav>
          <div id="study-sets">  
            {studysets.map(studyset=>(
                <div className="studyset" key={studyset.ss_id}>
                    <Link to={`/studysets/${studyset.ss_id}`} >
                    <h1>{studyset.title}</h1>
                    </Link>
                    <button className="delete" onClick={()=>handleDelete(studyset.ss_id)}>Delete</button>
                </div>
            ))}
            <button>
            <Link to={`/createstudysets/${courseId}`}>Create Study Set</Link>
            </button>
           
          </div>     
       </div>
      </div>
    
  );

};

export default Classes;