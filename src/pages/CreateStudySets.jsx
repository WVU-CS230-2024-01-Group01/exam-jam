import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStudySets = () =>{
    const [studyset,setStudySet]= useState({
        title: ""
    })

    const navigate = useNavigate()

    const handleChange=(e)=>{
        setStudySet(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick=async e=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8081/studysets", studyset)
            navigate("/studysets")
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