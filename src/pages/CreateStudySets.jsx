import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
        <div className="form">
            <h1>Create Study Set</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
            <button className="formButton" onClick={handleClick}>Create</button>
        </div>
    )
}

export default CreateStudySets