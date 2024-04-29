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
        await axios.delete(`http://localhost:8081/studysets/${ss_id}`);
        setStudySets(studysets.filter(set => set.ss_id !== ss_id));
    }catch(err){
        console.log(err)
    }
}

return (
    <div>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
        <div className="hero">
            <nav className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="10px" />
                    {course.map(course=>(
                        <h1 className="class-title">{course.title}</h1>
                    ))}
                </div>
                <div>
                    <Link to="/"><button className="button-style">Homepage</button></Link>
                    <Link to="/profilepage"><button className="button-style">Edit Profile</button></Link>
                    <Link to="/logout"><button className="button-style">Logout</button></Link>      
                </div>
            </nav>

            <button className="create-study-set-button">
                <Link to={`/createstudysets/${courseId}`}>Create Study Set</Link>
            </button>

            <div className="search-container">
                <div className="container">
                <div className="row">
                    {studysets.map(studyset => (
                    <div key={studyset.ss_id} className="col-6 col-md-4 col-lg-3 mb-4">
                        <div className="card" style={{ width: "200px", height: "200px"}}>
                            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                <h5 className="card-title">{studyset.title}</h5>
                                <Link to={`/studysets/${studyset.ss_id}`} className="btn btn-primary">View Study Set</Link>
                                <button className="btn btn-danger mt-2" onClick={() => handleDelete(studyset.ss_id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            
        </div>
    </div>
  );
  

};

export default Classes;