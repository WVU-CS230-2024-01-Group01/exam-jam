import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import "./StudySetStyles.css";

const SingleStudySet = () => {
    const [studyset,setStudySet]= useState([]);
    const [studycards,setStudyCards]= useState([]);

    const location = useLocation()
    const setId = location.pathname.split("/")[2];

    useEffect(()=>{
        const fetchSingleStudySet = async ()=>{
            try{
                const res = await axios.get(`http://localhost:8081/studysets/${setId}`)
                setStudySet(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchSingleStudySet()
    },[setId])

    useEffect(()=>{
        const fetchStudyCards = async ()=>{
            try{
                const res = await axios.get(`http://localhost:8081/studycards/${setId}`)
                setStudyCards(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchStudyCards()
    },[setId])

    return  ( 
    <div>
        <div className="studyset">
        <nav>
           <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="10px" />
           <div>
               {studyset.map(studyset=>(
                <div key={studyset.ss_id}>
                    <h1 className="study-set-title">{studyset.title}</h1>
                </div>
                ))}
                
                   
               
               
            </div>
             <Link to={`/editstudysets/${studyset.ss_id}`}><button className="button-style">Edit</button></Link>
             <Link to={`/classes/${studyset.class_id}`}><button className="button-style">Back to Class</button></Link>
                
           <Link to="/"><button className="button-style">Homepage</button></Link>
           <Link to="/profilepage"><button className="button-style">Edit Profile</button></Link>
           <Link to="/logout"><button className="button-style">Logout</button></Link>      
          </nav>
            
            <div>
                {studycards.map(studycard=>(
                   <div className="study-card-container" key={studycard.card_id}>
                        <h2 id="study-card">{studycard.side1}</h2>
                        <h2 id="study-card">{studycard.side2}</h2>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default SingleStudySet