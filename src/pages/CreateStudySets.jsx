// Importing necessary modules
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Importing CSS stylesheets
import "./StudySetStyles.css";
import "./LoginStyles.css";

// Functional component for creating study sets
const CreateStudySets = () => {
    // Retrieving username from local storage
    let username = localStorage.getItem('user')

    // Getting current location and extracting course ID from URL
    const location = useLocation()
    const courseId = location.pathname.split("/")[2];

    // State to manage study set data
    const [studyset, setStudySet] = useState({
        title: "",
        uid: username,
        class_id: courseId
    })

    // Hook for navigating between routes
    const navigate = useNavigate()

    // Function to handle input changes
    const handleChange = (e) => {
        // Updating study set state with new input values
        setStudySet(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Function to handle form submission
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            // Sending POST request to create a new study set
            let res = await axios.post("http://localhost:8081/studysets/", studyset)
            let ss_id = res.data
            let question = "UPDATE_CREATEDSETS"

            // Sending PUT request to update user account with the newly created study set
            await axios.put("http://localhost:8081/accounts/", { question, username, ss_id })

            // Navigating to the class page after successful creation
            navigate("/classes/" + courseId);
        } catch (err) {
            // Logging error if any
            console.log(err)
        }
    }

    // Logging study set state
    console.log(studyset)

    // Function to handle cancel button click
    const handleCancel = () => {
        // Navigating to the previous page
        navigate(-1);
    };

    // Rendering form for creating a new study set
    return (
        <div className="Login">
            <div className="form-box">
                <h1>Create Study Set</h1>
                <form onSubmit={handleClick}>
                    <div className="info">
                        <label htmlFor="title">Title</label>
                        {/* Input field for study set title */}
                        <input className="createStudySetInput" type="text" placeholder="Enter a title" onChange={handleChange} name="title" />
                    </div>
                    <div className="buttons">
                        {/* Button to submit form */}
                        <button type="submit" className="styledButtons">Create</button>
                        {/* Button to cancel form submission */}
                        <button className="styledButtons" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Exporting the component
export default CreateStudySets;
