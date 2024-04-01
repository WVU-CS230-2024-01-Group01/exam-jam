//Loads and refreshes search results on a new page

import { Link } from "react-router-dom";
import "../pages/Homepage.css";
import React, { useState } from "react";



const Results = () => {
    return (
        <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />
            <div className="hero">
                <nav>
                    <h2 className="logo">ExamJam</h2>
                    <h1>Welcome</h1>

                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/profilepage"><button>Edit Profile</button></Link>
                    <Link to="/logout"><button>Logout</button></Link>

                </nav>
                <div className="search-container">
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Please enter a class name"
                    />
                    <button id="searchButton">Search</button>
                </div>
                <p2> Search Results </p2>
                <div id="searchResults" />

                <div id="classBox">
                    <span>*class card here*</span>
                    <span>*class card here*</span>
                    <span>*class card here*</span>
                </div>

            </div>
        </div>
    );
};

export default Home;