import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const StudySets = () =>{
    const [studysets,setStudySets]= useState([])

    useEffect(()=>{
        const fetchAllStudySets = async ()=>{
            try{
                const res = await axios.get("http://localhost:3306/studysets")
                setStudySets(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllStudySets()
    },[])

    const handleDelete = async (id) =>{
        try{
            await axios.delete("http://localhost:3306/studysets/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return(<div>
        <div className= "studysets">
            {studysets.map(studyset=>(
                <div className="studyset" key={studyset.id}>
                   <h1>{studyset.title}</h1>
                   <button className="delete" onClick={()=>handleDelete(studyset.id)}>Delete</button>
                   <button className="editstudysets"><Link to={`/editstudysets/${studyset.id}`}>Edit</Link></button>
                </div>
            ))}
        </div>
        <button>
            <Link to="/createstudysets">Create Study Set</Link>
        </button>
    </div>
    )
}

export default StudySets