import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditStudySets = () =>{
    const [studyset,setStudySet]= useState({
        title: ""
    })

    const [studycard, setStudyCard]= useState({
        side1: "",
        side2: ""
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
            await axios.put("http://localhost:8081/studysets/"+setId, studyset)

            const newStudyCard = {
                ss_id: setId, 
                side1: studycard.side1,
                side2: studycard.side2
            };

            await axios.post("http://localhost:8081/studycards", newStudyCard)

            navigate("/studysets")
        }catch(err){
            console.log(err)
        }
    }

    const handleCardChange=(e)=>{
        setStudyCard(prev=>({...prev, [e.target.name]: e.target.value}))
    }


    console.log(studyset)
    return(
        <div className="form">
            <h1>Edit Study Set</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="Side1" onChange={handleCardChange} name="side1"/>
            <input type="text" placeholder="Side2" onChange={handleCardChange} name="side2"/>
            <button className="formButton" onClick={handleClick}>Confirm</button>
            <button className="formButton"><Link to={`/studysets`}>Go Back</Link></button>
        </div>
    )
}

export default EditStudySets