import React, { useState } from 'react';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { Link } from 'react-router-dom';
import Classes from "../pages/Classes.js";
import { app } from "./Firebase.js";


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value.trim());
    };

    const handleSearch = async () => {
        if (searchInput === "") {
            alert("Please enter a valid search term.");
            return;
        }

        // Simulate searching class list
        const searchResultsData = await searchClassList(searchInput);
        setSearchResults(searchResultsData);
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
        const filtered = classList.filter(classLists => classLists.wvuClass.toLowerCase().includes(query.toLowerCase()));
        return filtered;
    };

    const handleCallClasses = async (classId) => {

    }

    return (
        <div>
            <input
                id="searchInput"
                type="text"
                value={searchInput}
                onChange={handleInputChange}
            />
            <button id="searchButton" onClick={handleSearch}>Search</button>
            <div id="searchResults">
                {searchResults.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    searchResults.map(classList => (
                        <div key={classList.wvuClass}>
                           <p className="list-group-item list-group-item-action"><Link to="/classes"><button id = "classButton" onClick={handleCallClasses}>{classList.wvuClass}</button></Link></p> {/*line author: Avery Ryan*/}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchBar;