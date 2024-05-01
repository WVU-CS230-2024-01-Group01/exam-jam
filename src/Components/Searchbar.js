import React, { useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import { Link } from 'react-router-dom';
import { app } from "./Firebase.js";

// Functional component "SearchBar"
const SearchBar = () => {
    // State variables for search input and search results
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Handler for input change event
    const handleInputChange = (event) => {
        setSearchInput(event.target.value.trim());
    };

    // Handler for search button click event
    const handleSearch = async () => {
        if (searchInput !== "") { // Only search if provided a valid search term
            const searchResultsData = await searchClassList(searchInput);
            setSearchResults(searchResultsData);
        }
    };

    // Function to search class list based on query
    const searchClassList = async (query) => {
        // Simulate searching class list based on query
        // This can be replaced with actual data retrieval logic
        let classList = [];
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `wvuList`)).then((snapshot) => {
            if (snapshot.exists()) {
                classList = snapshot.val();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        const filtered = classList.filter(classLists => classLists.title.toLowerCase().includes(query.toLowerCase()));
        return filtered;
    };

    // Component rendering
    return (
        <div>
            {/* Search input field */}
            <input
                id="searchInput"
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Ex: CS 230"
            />
            {/* Search button */}
            <button id="searchButton" onClick={handleSearch}>Search</button>
            {/* Display search results */}
            <div id="searchResults" className="d-flex justify-content-center">
                {searchResults.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    /* Display search results using Bootstrap cards */
                    <div className="container">
                        <div className="row">
                            {searchResults.map(classList => (
                                <div key={classList.title} className="col-6 col-md-4 col-lg-3 mb-4">
                                    <div className="card" style={{ width: "200px", height: "200px"}}>
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                            {/* Class title */}
                                            <h5 className="card-title">{classList.title}</h5>
                                            {/* Link to class page */}
                                            <Link to={`/classes/${classList.class_id}`} className="btn btn-primary">Go to Class</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
