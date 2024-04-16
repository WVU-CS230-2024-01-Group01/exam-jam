/**
 * @file StudySets.jsx
 * @brief Functional component for displaying and managing study sets.
 */

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


/**
 * StudySets component displays a list of study sets, allowing deletion of individual sets.
 * It also provides links to edit existing sets or create new ones.
 * @returns {JSX.Element} StudySets component JSX
 */
const StudySets = () =>{
    const [studysets,setStudySets]= useState([])


    /**
     * useEffect hook to fetch all study sets from the server upon component mount.
     * Sets the fetched data to the studysets state.
     */
    useEffect(()=>{
        const fetchAllStudySets = async ()=>{
            try{
                const res = await axios.get("http://localhost:8081/studysets")
                setStudySets(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllStudySets()
    },[])


    /**
     * Handle deletion of a study set by its ID.
     * @param id - ID of the study set to delete
     */
    const handleDelete = async (ss_id) =>{
        try{
            await axios.delete("http://localhost:8081/studysets/"+ss_id)
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
                   <button className="delete" onClick={()=>handleDelete(studyset.ss_id)}>Delete</button>
                   <button className="editstudysets"><Link to={`/editstudysets/${studyset.ss_id}`}>Edit</Link></button>
                </div>
            ))}
        </div>
        <button>
            <Link to="/createstudysets">Create Study Set</Link>
        </button>
        <button>
            <Link to="/" className="btn btn-primary">Homepage</Link>
        </button>
    </div>
    )
}

export default StudySets