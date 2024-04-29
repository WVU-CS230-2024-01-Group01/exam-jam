import React, { useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import { Link } from 'react-router-dom';
import { app } from "./Firebase.js";


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value.trim());
    };

    const handleSearch = async () => {
        if (searchInput !== "") { //only search if provided a valid search term
            const searchResultsData = await searchClassList(searchInput);
            setSearchResults(searchResultsData);
        }
    };

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

    return (
        <div>
            <input
                id="searchInput"
                type="text"
                value={searchInput}
                onChange={handleInputChange}
            />
            <button id="searchButton" onClick={handleSearch}>Search</button>
            {/* tried to add this to center the cards on the screen also did not work */}
            <div id="searchResults" className="d-flex justify-content-center">
                {searchResults.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    /*this uses the cards from bootstrap and then flex displays them depending on screen size -Alyssa */
                    <div className="container">
                        <div className="row">
                            {searchResults.map(classList => (
                                <div key={classList.title} className="col-6 col-md-4 col-lg-3 mb-4">
                                    <div className="card" style={{ width: "200px", height: "250px" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{classList.title}</h5>
                                            <p className="card-text">Class description or details here.</p>
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