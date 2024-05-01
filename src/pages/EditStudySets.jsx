import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./StudySetStyles.css";

const EditStudySets = () => {
    const [studyset, setStudySet] = useState({});
    const [studycards, setStudyCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const setId = location.pathname.split("/")[2];

    // Fetch study set details
    useEffect(() => {
        const fetchSingleStudySet = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/studysets/${setId}`);
                if (res.data && res.data.length > 0) {
                    const firstStudySet = res.data[0];
                    setStudySet(firstStudySet);
                }
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };
        fetchSingleStudySet();
    }, [setId]);

    // Fetch study cards associated with the study set
    useEffect(() => {
        const fetchStudyCards = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/studycards/${setId}`);
                setStudyCards(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStudyCards();
    }, [setId]);

    // Handle change in study set details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudySet((prevStudySet) => ({
            ...prevStudySet,
            [name]: value
        }));
    };

    // Handle change in study card details
    const handleCardChange = (e, card_id) => {
        const { name, value } = e.target;
        setStudyCards((prevStudyCards) =>
            prevStudyCards.map((card) =>
                card.card_id === card_id ? { ...card, [name]: value } : card
            )
        );
    };

    // Handle click event for confirming changes
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/studysets/${setId}`, studyset);
            studycards.forEach(async (studycard) => {
                await axios.put(`http://localhost:8081/studycards/${studycard.card_id}`, studycard);
            });
            navigate("/studysets/" + setId);
        } catch (err) {
            console.log(err);
        }
    };

    // Delete a study card
    const cardDelete = async (card_id) => {
        try {
            await axios.delete(`http://localhost:8081/studycards/${card_id}`);
            setStudyCards((prevStudyCards) =>
                prevStudyCards.filter((studycard) => studycard.card_id !== card_id)
            );
        } catch (err) {
            console.log(err);
        }
    };

    // Add a new study card
    const addCard = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8081/studycards/${setId}`, null);
            const res = await axios.get(`http://localhost:8081/studycards/${setId}`);
            setStudyCards(res.data); 
        } catch (err) {
            console.log(err);
        }
    };

    // Render loading if data is loading
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Render the form
    return (
        <div className="form">
           <h1 className="styledButtons">Edit Study Set</h1>
           <div className="studyset" key={studyset.ss_id}>
               <input
                   type="text"
                   value={studyset.title}
                   placeholder="Title"
                   onChange={(e)=>handleChange(e)}
                   name="title"
               />
           </div>
           <div>
               <button className="formButton" onClick={addCard}>Add Card</button>
               {studycards.map((studycard) => (
                   <div className="studycard" key={studycard.card_id}>
                       <input
                           type="text"
                           value={studycard.side1 || ""}
                           placeholder="Side1"
                           onChange={(e) => handleCardChange(e, studycard.card_id)}
                           name="side1"
                       />
                       <input
                           type="text"
                           value={studycard.side2 || ""}
                           placeholder="Side2"
                           onChange={(e) => handleCardChange(e, studycard.card_id)}
                           name="side2"
                       />
                       <button className="styledButtons" onClick={() => cardDelete(studycard.card_id)}>
                           Delete
                       </button>
                   </div>
               ))}
           </div>
           <button className="styledButtons" onClick={handleClick}>
               Confirm
           </button>
           <button className="styledButtons">
           <Link to={`/studysets/${setId}`}>Go Back</Link>
           </button>
       </div>
    );
};

export default EditStudySets;
