import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditStudySets = () => {
    const [studyset, setStudySet] = useState({});
    const [studycards, setStudyCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const setId = location.pathname.split("/")[2];

    
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudySet((prevStudySet) => ({
            ...prevStudySet,
            [name]: value
        }));
    };

    const handleCardChange = (e, card_id) => {
        const { name, value } = e.target;
        setStudyCards((prevStudyCards) =>
            prevStudyCards.map((card) =>
                card.card_id === card_id ? { ...card, [name]: value } : card
            )
        );
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/studysets/${setId}`, studyset);
            studycards.map((studycard)=>(
            axios.put(`http://localhost:8081/studycards/${studycard.card_id}`, studycard)
            ))
            navigate("/studysets");
        } catch (err) {
            console.log(err);
        }
    };

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form">
            <h1>Edit Study Set</h1>
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
                        <button className="delete" onClick={() => cardDelete(studycard.card_id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <button className="formButton" onClick={handleClick}>
                Confirm
            </button>
            <button className="formButton">
                <Link to={`/studysets`}>Go Back</Link>
            </button>
        </div>
    );
};

export default EditStudySets;