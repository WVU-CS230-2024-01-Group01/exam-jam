import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditStudySets = () =>{
    const [studyset,setStudySet]= useState({
        title: ""
    })

    const navigate = useNavigate()
    const location = useLocation()

    const setId = location.pathname.split("/")[2]

    const handleChange=(e)=>{
        setStudySet(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick=async e=>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/studysets/"+setId, studyset)
            navigate("/studysets")
        }catch(err){
            console.log(err)
        }
    }

    console.log(studyset)
    return(
        <div className="form">
            <h1>Edit Study Set</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
            <button className="formButton" onClick={handleClick}>Confirm</button>
            <button className="formButton"><Link to={`/studysets`}>Go Back</Link></button>
        </div>
    )
}

export default EditStudySets