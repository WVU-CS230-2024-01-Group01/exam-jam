import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";

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

    return( <div>
                <div className= "studysets">
                    <div>
                        {studyset.map(studyset=>(
                            <div className="studyset" key={studyset.ss_id}>
                                <h1>{studyset.title}</h1>
                                <button className="editstudysets"><Link to={`/editstudysets/${studyset.ss_id}`}>Edit</Link></button>
                                <button className="backtoclass"><Link to={`/classes/${studyset.class_id}`}>Back to Class</Link></button>
                            </div>
                        ))}
                    </div>
                    <div>
                        {studycards.map(studycard=>(
                            <div className="studycard" key={studycard.card_id}>
                                <h2>{studycard.side1}</h2>
                                <h2>{studycard.side2}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default SingleStudySet