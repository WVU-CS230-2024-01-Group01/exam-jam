import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./StudySetStyles.css";
import "./LoginStyles.css";

const CreateStudySets = () =>{
    let username = localStorage.getItem('user')

    const location = useLocation()
    const courseId = location.pathname.split("/")[2];

    const [studyset,setStudySet]= useState({
        title: "",
        uid: username,
        class_id: courseId
    })

    const navigate = useNavigate()

    const handleChange=(e)=>{
        setStudySet(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick=async e=>{
        e.preventDefault()
        try{
            let res = await axios.post("http://localhost:8081/studysets", studyset)
            let ss_id = res.data
            let question = "UPDATE_CREATEDSETS"
            await axios.put("http://localhost:8081/accounts", {question, username, ss_id})  
            
            navigate("/classes/"+courseId);
        }catch(err){
            console.log(err)
        }
    }

    console.log(studyset)
    return(
        <div className="Login">
    <div className="form-box">
        <h1>Create Study Set</h1>
        <form onSubmit={handleClick}>
            <div className="info">
                <label htmlFor="title">Title</label>
                <input className="createStudySetInput" type="text" placeholder="Enter a title" onChange={handleChange} name="title" />
            </div>
            <div className="buttons">
                <button type="submit" className="createButton">Create</button>
                <Link to="/studysets" className="styledButtons">Cancel</Link>
            </div>
        </form>
    </div>
</div>
    )
}

export default CreateStudySets
